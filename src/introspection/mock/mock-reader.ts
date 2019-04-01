import * as path from 'path';
import { singularize, camelize, pluralize } from 'inflection';
import { DataReader } from '../data-reader';
import { MockDataSource, MockDataEntity } from '../../model/data-source';
import { Entity } from '../../model/entity';
import { RelationshipConfig } from '../../model/relationship-config';
import {
    GraphQLFieldMap,
    GraphQLObjectType,
    GraphQLOutputType,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';
import { Field } from '../../model/field';
import {
    requiredTypeOrNormal,
    valuesAreArray,
    valuesAreBoolean,
    valuesAreDate,
    valuesAreFile,
    valuesAreString,
    valuesAreInteger,
    valuesAreBitInt,
    valuesAreNumeric,
    valuesAreObject,
    getTypeFromValues
} from '../type-helper';
import { FileType, DateType } from '../ex-graphql-type';
import * as GraphQLJSON from 'graphql-type-json';
import * as BigInt from 'graphql-bigint';

export class MockDataReader extends DataReader {
    dataFilePathHandler(dataSource: MockDataSource, dataFilePath: string): string {
        return dataFilePath;
    }
    protected async getEntitiesFromDataSource(
        dataSource: MockDataSource,
        relationshipConfig: RelationshipConfig
    ): Promise<Entity[]> {
        return Object.keys(dataSource).map(
            (entityKey): Entity => {
                const entityDataList = dataSource[entityKey];
                const entityName = this.getEntityNameFromKey(entityKey);
                const { fields, hasDate, hasBigInt, hasJSON, hasFile } = this.getFieldsFromEntityDataList(
                    entityKey,
                    entityDataList,
                    relationshipConfig
                );
                return {
                    key: entityKey,
                    name: entityName,
                    fields,
                    hasDate,
                    hasBigInt,
                    hasJSON,
                    hasFile,
                    type: new GraphQLObjectType({
                        name: entityName,
                        fields: fields.reduce((fieldMap, field): GraphQLFieldMap<any, any, any> => {
                            fieldMap[field.name] = { name: field.name, type: field.type };
                            return fieldMap;
                        }, {})
                    })
                };
            }
        );
    }
    protected getEntityNameFromKey(key: string): string {
        return camelize(singularize(key));
    }
    protected getFieldNameFromKey(key: string): string {
        return key; //camelize(key, true);
    }
    protected getRelatedEntityFieldNameFromKey(key: string): string {
        return camelize(this.getEntityNameFromKey(key.replace(/((_i)|I)d$/g, '')), true);
    }
    protected getFieldNameInRelatedEntity(entityKey: string): string {
        return camelize(pluralize(this.getEntityNameFromKey(entityKey)), true);
    }

    getFieldsFromEntityDataList(
        entityKey: string,
        entityDataList: MockDataEntity[],
        relationshipConfig: RelationshipConfig
    ): { fields: Field[]; hasDate; hasBigInt: boolean; hasJSON: boolean; hasFile: boolean } {
        let hasDate: boolean = false,
            hasBigInt: boolean = false,
            hasJSON: boolean = false,
            hasFile: boolean = false;

        const fieldValues: { [key: string]: any[] } = {};
        entityDataList.forEach((entity) => {
            Object.keys(entity).forEach((fieldName) => {
                if (!fieldValues[fieldName]) {
                    fieldValues[fieldName] = [];
                }
                if (entity[fieldName] != null) {
                    fieldValues[fieldName].push(entity[fieldName]);
                }
            });
        });
        const fields = Object.keys(fieldValues).map(
            (key): Field => {
                const isId = key.toLowerCase() == 'id';
                const [type, hasDateInField, hasBigIntInField, hasJSONInField, hasFileInField] = getTypeFromValues(
                    entityKey,
                    key,
                    fieldValues[key],
                    entityDataList.length,
                    relationshipConfig,
                    isId
                );
                hasDate = hasDate || hasDateInField;
                hasBigInt = hasBigInt || hasBigIntInField;
                hasJSON = hasJSON || hasJSONInField;
                hasFile = hasFile || hasFileInField;
                return { isId, key, name: this.getFieldNameFromKey(key), type };
            }
        );
        return {
            fields,
            hasDate,
            hasBigInt,
            hasJSON,
            hasFile
        };
    }
    getTemplateFromConfig(templateFiles: {
        mockDataSource?: string | undefined;
        sqliteDataSource?: string | undefined;
    }): string {
        return (
            templateFiles.mockDataSource || path.join(__dirname, '../../../template/data-source/mock-data-source.tpl')
        );
    }
}
