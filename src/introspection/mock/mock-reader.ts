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
    valuesAreObject
} from './type-helper';
import { FileType, DateType } from '../ex-graphql-type';
import * as GraphQLJSON from 'graphql-type-json';
import * as BigInt from 'graphql-bigint';

export class MockDataReader extends DataReader {
    protected getEntitiesFromDataSource(dataSource: MockDataSource, relationshipConfig: RelationshipConfig): Entity[] {
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
                    count: entityDataList.length,
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
    isIdField(fieldKey: string): boolean {
        return fieldKey.toLowerCase() == 'id';
    }

    getTypeFromValues(
        entityKey: string,
        fieldKey: string,
        values: any[],
        entityDataCount: number,
        relationshipConfig: RelationshipConfig
    ): [GraphQLOutputType, boolean, boolean, boolean, boolean] {
        const isRequired = values.length == entityDataCount;
        if (this.isIdField(fieldKey) || (relationshipConfig[entityKey] && relationshipConfig[entityKey][fieldKey])) {
            return requiredTypeOrNormal(GraphQLID, isRequired);
        }
        if (values.length > 0) {
            if (valuesAreArray(values)) {
                const leafValues = values.reduce((agg, arr) => {
                    arr.forEach((value) => agg.push(value));
                    return agg;
                }, []);
                if (valuesAreBoolean(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(GraphQLBoolean), isRequired);
                }
                if (valuesAreDate(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(DateType), isRequired);
                }
                if (valuesAreFile(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(FileType), isRequired);
                }
                if (valuesAreString(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired);
                }
                if (valuesAreInteger(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(GraphQLInt), isRequired);
                }
                if (valuesAreBitInt(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(BigInt), isRequired);
                }
                if (valuesAreNumeric(leafValues)) {
                    return requiredTypeOrNormal(new GraphQLList(GraphQLFloat), isRequired);
                }
                if (valuesAreObject(leafValues)) {
                    return requiredTypeOrNormal(GraphQLJSON, isRequired);
                }
                return requiredTypeOrNormal(new GraphQLList(GraphQLString), isRequired); // FIXME introspect further
            }
            if (valuesAreBoolean(values)) {
                return requiredTypeOrNormal(GraphQLBoolean, isRequired);
            }
            if (valuesAreDate(values)) {
                return requiredTypeOrNormal(DateType, isRequired);
            }
            if (valuesAreFile(values)) {
                return requiredTypeOrNormal(FileType, isRequired);
            }
            if (valuesAreString(values)) {
                return requiredTypeOrNormal(GraphQLString, isRequired);
            }
            if (valuesAreInteger(values)) {
                return requiredTypeOrNormal(GraphQLInt, isRequired);
            }
            if (valuesAreBitInt(values)) {
                return requiredTypeOrNormal(BigInt, isRequired);
            }
            if (valuesAreNumeric(values)) {
                return requiredTypeOrNormal(GraphQLFloat, isRequired);
            }
            if (valuesAreObject(values)) {
                return requiredTypeOrNormal(GraphQLJSON, isRequired);
            }
        }
        return requiredTypeOrNormal(GraphQLString, isRequired); // FIXME introspect further
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
        const fields = Object.keys(fieldValues).map((key) => {
            const [type, hasDateInField, hasBigIntInField, hasJSONInField, hasFileInField] = this.getTypeFromValues(
                entityKey,
                key,
                fieldValues[key],
                entityDataList.length,
                relationshipConfig
            );
            hasDate = hasDate || hasDateInField;
            hasBigInt = hasBigInt || hasBigIntInField;
            hasJSON = hasJSON || hasJSONInField;
            hasFile = hasFile || hasFileInField;
            return {
                key,
                name: this.getFieldNameFromKey(key),
                values: fieldValues[key],
                type
            };
        });
        return {
            fields,
            hasDate,
            hasBigInt,
            hasJSON,
            hasFile
        };
    }
}
