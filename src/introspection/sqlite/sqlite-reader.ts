import * as path from 'path';
import { singularize, camelize, pluralize } from 'inflection';
import * as sqlite from 'sqlite';
import * as sqliteParser from 'sqlite-parser';
import * as BigInt from 'graphql-bigint';
import { DataReader } from '../data-reader';
import { RelationshipConfig } from '../../model/relationship-config';
import { Entity } from '../../model/entity';
import { SqliteDataSource, TableDefinition, Statement, Definition } from '../../model/data-source';
import { Field } from '../../model/field';
import {
    GraphQLObjectType,
    GraphQLFieldMap,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLOutputType,
    GraphQLInt,
    GraphQLFloat
} from 'graphql';
import { DateType, FileType } from '../ex-graphql-type';
import { requiredTypeOrNormal, getTypeFromValues } from '../type-helper';

export class SqliteDataReader extends DataReader {
    tablePrefix: string;
    fieldPrefix: string;
    dataFilePathHandler(dataSource: SqliteDataSource, dataFilePath: string): string {
        return path.resolve(process.cwd(), dataSource.dbFilePath);
    }
    protected async getEntitiesFromDataSource(
        dataSource: SqliteDataSource,
        relationshipConfig: RelationshipConfig
    ): Promise<Entity[]> {
        this.tablePrefix = dataSource.tablePrefix || '';
        this.fieldPrefix = dataSource.fieldPrefix || '';
        const db = await sqlite.open(path.resolve(process.cwd(), dataSource.dbFilePath));
        const tables = await db.all(
            'select * from sqlite_master where type = "table" and name like ?;',
            `${this.tablePrefix}%`
        );
        const entities = await Promise.all(
            tables
                .filter((table) => !table.name.startsWith('sqlite_'))
                .map((table) => this.getEntityFromSql(db, table.sql, relationshipConfig))
        );
        return entities.filter((entity) => !!entity) as Entity[];
    }
    protected getEntityNameFromKey(key: string): string {
        return camelize(singularize(key.replace(new RegExp(`^${this.tablePrefix}`, 'g'), '').toLowerCase()));
    }
    protected getFieldNameFromKey(key: string): string {
        return camelize(key.replace(new RegExp(`^${this.fieldPrefix}`, 'g'), ''), true);
    }
    protected getRelatedEntityFieldNameFromKey(key: string): string {
        return camelize(this.getEntityNameFromKey(key.replace(/((_i)|I)d$/g, '')), true);
    }
    protected getFieldNameInRelatedEntity(entityKey: string): string {
        return camelize(pluralize(this.getEntityNameFromKey(entityKey)), true);
    }

    protected async getEntityFromSql(
        db: sqlite.Database,
        createTableSql: string,
        relationshipConfig: RelationshipConfig
    ): Promise<Entity | undefined> {
        const tableDefinition: TableDefinition = sqliteParser(createTableSql);
        let tableStatement: Statement;
        if (
            !tableDefinition ||
            !tableDefinition.statement ||
            !tableDefinition.statement.length ||
            !(tableStatement = tableDefinition.statement[0]) ||
            !tableStatement.definition ||
            !tableStatement.definition.length
        ) {
            return;
        }
        const tableName = tableStatement.name.name;
        const entityName = this.getEntityNameFromKey(tableName);

        const { fields, hasDate, hasBigInt, hasJSON, hasFile } = await this.getFieldsFromDefinition(
            db,
            tableName,
            tableStatement.definition,
            relationshipConfig
        );
        return {
            key: tableName,
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
    protected async getFieldsFromDefinition(
        db: sqlite.Database,
        tableName: string,
        definitions: Definition[],
        relationshipConfig: RelationshipConfig
    ): Promise<{ fields: Field[]; hasDate: boolean; hasBigInt: boolean; hasJSON: boolean; hasFile: boolean }> {
        let hasDate: boolean = false,
            hasBigInt: boolean = false,
            hasJSON: boolean = false,
            hasFile: boolean = false;

        const fields = await Promise.all(
            definitions.map(
                async (fieldDefinition): Promise<Field> => {
                    let fieldType: GraphQLOutputType = GraphQLString;

                    let type, hasDateInField, hasBigIntInField, hasJSONInField, hasFileInField;
                    const fieldKey = fieldDefinition.name!.toLowerCase();
                    const fieldName = this.getFieldNameFromKey(fieldKey);

                    const constraints = fieldDefinition.definition!;
                    const { variant, affinity } = fieldDefinition.datatype!;

                    let notNull = false,
                        isId = false;
                    constraints.some((constraintDef) => {
                        notNull = constraintDef.variant == 'not null';
                        isId = constraintDef.variant == 'primary key';
                        return notNull && isId;
                    });
                    const lowerVariant = variant.toLowerCase();
                    const lowerAffinity = affinity.toLowerCase();

                    if (isId) {
                        fieldType = GraphQLID;
                    } else if (lowerVariant == 'date' || lowerVariant == 'datetime') {
                        fieldType = DateType;
                    } else if (lowerVariant == 'boolean') {
                        fieldType = GraphQLBoolean;
                    } else if (lowerVariant == 'blob') {
                        fieldType = FileType;
                    } else if (lowerVariant == 'bigint' || lowerVariant == 'int64' || lowerVariant == 'largeint') {
                        fieldType = BigInt;
                    } else if (lowerAffinity == 'integer') {
                        fieldType = GraphQLInt;
                    } else if (lowerAffinity == 'real' || lowerAffinity == 'numeric') {
                        fieldType = GraphQLFloat;
                    } else {
                        let values = await db.all(
                            `select ${fieldKey} from ${tableName} order by length(${fieldKey}) desc limit 10;`
                        );
                        values = values.map((value) => {
                            const realValue = value[fieldKey];
                            try {
                                return JSON.parse(realValue);
                            } catch (e) {}
                            return realValue;
                        });
                        [type, hasDateInField, hasBigIntInField, hasJSONInField, hasFileInField] = getTypeFromValues(
                            tableName,
                            fieldKey,
                            values,
                            10,
                            relationshipConfig,
                            isId
                        );
                    }
                    [type, hasDateInField, hasBigIntInField, hasJSONInField, hasFileInField] = requiredTypeOrNormal(
                        fieldType,
                        notNull
                    );

                    hasDate = hasDate || hasDateInField;
                    hasBigInt = hasBigInt || hasBigIntInField;
                    hasJSON = hasJSON || hasJSONInField;
                    hasFile = hasFile || hasFileInField;

                    return { isId, key: fieldKey, name: fieldName, type };
                }
            )
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
            templateFiles.sqliteDataSource ||
            path.join(__dirname, '../../../template/data-source/sqlite-data-source.tpl')
        );
    }
}
