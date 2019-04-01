import {
    GraphQLInputObjectType,
    GraphQLOutputType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLType,
    GraphQLSchema,
    GraphQLObjectType,
    extendSchema,
    parse
} from 'graphql';
import { pluralize, camelize, singularize } from 'inflection';
import { DataSource, SourceRelationshipMap } from '../model/data-source';
import { Entity } from '../model/entity';
import { RelationshipConfig, FieldRelationship, EntityRelationship } from '../model/relationship-config';
import { EntitiesWithSchema } from '../model/entities-with-schema';
import {
    getInputTypesFromEntities,
    getFilterTypesFromData,
    getNamedEntityMap,
    InputTypeMap,
    changeFileToUploadIfNeeded,
    getGraphqlFieldMapFromFields,
    isRelationField,
    getNullableFieldsFromFieldsExcludeFun,
    isOneToManyField,
    getRelationIdsFromFields,
    isFieldHasRelation
} from './common-handler';
import { Field, ManyToOneField, ManyToManyField, OneToManyField } from '../model/field';

export abstract class DataReader {
    /**
     * 从数据源中获取实体数组
     *
     * @abstract
     * @param {DataSource} dataSource
     * @param {RelationshipConfig} relationshipConfig
     * @returns {Entity[]}
     * @memberof DataReader
     */
    protected abstract async getEntitiesFromDataSource(
        dataSource: DataSource,
        relationshipConfig: RelationshipConfig
    ): Promise<Entity[]>;
    /**
     * 从实体的key（或表名）获取实体名称
     *
     * @abstract
     * @param {string} key
     * @returns {string}
     * @memberof DataReader
     */
    protected abstract getEntityNameFromKey(key: string): string;
    /**
     * 从字段的key（或数据库中字段名）获取实体的字段名
     *
     * @abstract
     * @param {string} key
     * @returns {string}
     * @memberof DataReader
     */
    protected abstract getFieldNameFromKey(key: string): string;
    /**
     * 从关联字段key获取关联实体字段的字段名
     * @example
     * {
     *   users:[{
     *     orgId:1,
     *     category_id:2
     *   }]
     * }
     * getRelatedEntityFieldNameFromKey('orgId')=>'org'
     * getRelatedEntityFieldNameFromKey('category_id')=>'category'
     *
     * @abstract
     * @param {string} key
     * @returns {string}
     * @memberof DataReader
     */
    protected abstract getRelatedEntityFieldNameFromKey(key: string): string;
    /**
     * 获取当前实体在关联实体中关联字段的名称
     * @example
     * ```
     * {
     *   orgs:[{
     *     id:1,
     *     orgName:'OrgName'
     *   }],
     *   users:[{
     *     orgId:1,
     *     category_id:2
     *   }]
     * }
     * ```
     * //from field orgId: getFieldNameInRelatedEntity('users')=>'users'
     *
     * @abstract
     * @param {string} entityKey
     * @returns {string}
     * @memberof DataReader
     */
    protected abstract getFieldNameInRelatedEntity(entityKey: string): string;
    protected getRelatedFieldNamePrefix() {
        return 'related';
    }

    protected getRelationshipConfigFromSource(relationshipSource: SourceRelationshipMap): RelationshipConfig {
        return Object.keys(relationshipSource).reduce((ext, entityKey) => {
            const entityRelationshipSource = relationshipSource[entityKey];
            ext[entityKey] = Object.keys(entityRelationshipSource).reduce(
                (entityRelationship, fieldKey): EntityRelationship => {
                    const fieldConfig = entityRelationshipSource[fieldKey];
                    let fieldType: FieldRelationship;
                    if (Array.isArray(fieldConfig)) {
                        fieldType = {
                            entityKey,
                            fieldKey,
                            relatedEntityKey: fieldConfig[0],
                            relatedEntityName: this.getEntityNameFromKey(fieldConfig[0]),
                            fieldNameInRelatedEntity: fieldConfig[1],
                            relatedEntityFieldName: fieldConfig[2]
                                ? fieldConfig[2]
                                : this.getRelatedEntityFieldNameFromKey(fieldKey)
                        };
                    } else {
                        fieldType = {
                            entityKey,
                            fieldKey,
                            relatedEntityKey: fieldConfig,
                            relatedEntityName: this.getEntityNameFromKey(fieldConfig),
                            fieldNameInRelatedEntity: this.getFieldNameInRelatedEntity(entityKey),
                            relatedEntityFieldName: this.getRelatedEntityFieldNameFromKey(fieldKey)
                        };
                    }
                    entityRelationship[fieldKey] = fieldType;
                    return entityRelationship;
                },
                {}
            );
            return ext;
        }, {});
    }

    protected getEntitiespWithRelationship(entities: Entity[], relationshipConfig: RelationshipConfig): Entity[] {
        const namedEntityMap = getNamedEntityMap(entities);
        Object.keys(relationshipConfig).forEach((entityKey) => {
            const entityRelationship = relationshipConfig[entityKey];
            const entityName = this.getEntityNameFromKey(entityKey);
            const entity = namedEntityMap.get(entityName);
            if (entity) {
                const fields = entity.fields;
                let relationFieldCount = 0,
                    hasRelationField = false;
                for (const field of fields) {
                    const relationField = entityRelationship && entityRelationship[field.key];
                    hasRelationField = hasRelationField || !!relationField;
                    if (relationField) {
                        relationFieldCount++;
                        field.hasRelation = true;
                    }
                }
                entity.hasTwoRelationField = relationFieldCount === 2;
                entity.hasRelationField = hasRelationField;
            }
        });
        Object.keys(relationshipConfig).forEach((entityKey) => {
            const entityRelationship = relationshipConfig[entityKey];
            const entityName = this.getEntityNameFromKey(entityKey);
            const entity = namedEntityMap.get(this.getEntityNameFromKey(entityKey));
            let fieldIndex = 0;
            const entityRelationshipKeys = Object.keys(entityRelationship);
            entityRelationshipKeys.forEach((fieldKey) => {
                const relationField = entityRelationship[fieldKey];
                if (entity) {
                    entity.fields.push({
                        name: relationField.relatedEntityFieldName,
                        key: relationField.fieldKey,
                        relatedEntityKey: relationField.relatedEntityKey,
                        relatedEntityName: relationField.relatedEntityName,
                        type: relationField.relatedEntityName,
                        relatedFieldName: this.getFieldNameFromKey(relationField.fieldKey)
                    } as ManyToOneField);
                    let relatedEntity: Entity | undefined;
                    if (
                        relationField.relatedEntityName &&
                        (relatedEntity = namedEntityMap.get(relationField.relatedEntityName))
                    ) {
                        relatedEntity.fields.push({
                            name: relationField.fieldNameInRelatedEntity,
                            key: relationField.fieldKey,
                            relatedEntityKey: entityKey,
                            relatedEntityName: entityName,
                            type: `[${entityName}]`,
                            relatedFieldName: relationField.relatedEntityFieldName,
                            isToManyField: true
                        } as OneToManyField);
                        if (entity.hasTwoRelationField) {
                            const anotherRelationField =
                                entityRelationship[entityRelationshipKeys[(fieldIndex + 1) % 2]];
                            relatedEntity.fields.push({
                                name: `${this.getRelatedFieldNamePrefix()}${camelize(
                                    this.getFieldNameInRelatedEntity(anotherRelationField.relatedEntityName)
                                )}`,
                                key: relationField.fieldKey,
                                relatedEntityKey: entityKey,
                                relatedEntityName: entityName,
                                type: `[${anotherRelationField.relatedEntityName}]`,
                                relatedFieldName: relationField.relatedEntityFieldName,
                                isToManyField: true,
                                remoteEntityKey: anotherRelationField.relatedEntityKey,
                                remoteEntityName: anotherRelationField.relatedEntityName,
                                remoteFieldKey: anotherRelationField.fieldKey
                            } as ManyToManyField);
                        }
                    }
                }
                fieldIndex++;
            });
        });
        return entities;
    }
    protected getSchemaFromEntities(
        entities: Entity[],
        inputTypesByName: InputTypeMap,
        filterTypesByName: InputTypeMap
    ): GraphQLSchema {
        const queryType = new GraphQLObjectType({
            name: 'Query',
            fields: entities.reduce((queryFields, entity) => {
                const entityName = entity.name;
                const entityType = entity.type;
                queryFields[camelize(entityName, true)] = {
                    type: entity.type,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLID) }
                    }
                };
                queryFields[`all${pluralize(entityName)}`] = {
                    type: new GraphQLObjectType({
                        name: `${entityName}Page`,
                        fields: {
                            list: { type: new GraphQLList(entityType!) },
                            total: { type: GraphQLInt },
                            pages: { type: GraphQLInt }
                        }
                    }),
                    args: {
                        page: { type: GraphQLInt },
                        perPage: { type: GraphQLInt },
                        sortField: { type: GraphQLString },
                        sortOrder: { type: GraphQLString },
                        filter: { type: filterTypesByName[entityName] }
                    }
                };
                queryFields[`nonPagination${pluralize(entityName)}`] = {
                    type: new GraphQLList(entityType!),
                    args: {
                        sortField: { type: GraphQLString },
                        sortOrder: { type: GraphQLString },
                        filter: { type: filterTypesByName[entityName] }
                    }
                };
                return queryFields;
            }, {})
        });
        const mutationType = new GraphQLObjectType({
            name: 'Mutation',
            fields: entities.reduce((mutationFields, entity) => {
                const entityName = entity.name;
                const entityFields = entity.fields;
                if (entity.hasRelationField) {
                    const relatedArgs = getGraphqlFieldMapFromFields(
                        getNullableFieldsFromFieldsExcludeFun(changeFileToUploadIfNeeded(entityFields)),
                        (f) => isOneToManyField(f),
                        (f) => (isRelationField(f) ? inputTypesByName[f.relatedEntityName] : false),
                        (fields) => {
                            if (entity.hasTwoRelationField) {
                                return [...fields, ...getRelationIdsFromFields(fields, (f) => isFieldHasRelation(f))];
                            }
                            return fields;
                        }
                    );
                    mutationFields[`createRelated${pluralize(entityName)}`] = {
                        type: new GraphQLList(GraphQLID),
                        args: relatedArgs
                    };
                    mutationFields[`updateRelated${pluralize(entityName)}`] = {
                        type: new GraphQLList(GraphQLID),
                        args: relatedArgs
                    };
                }
                mutationFields[`create${entityName}`] = {
                    type: GraphQLID,
                    args: getGraphqlFieldMapFromFields(
                        getNullableFieldsFromFieldsExcludeFun(changeFileToUploadIfNeeded(entityFields)),
                        (f) => isRelationField(f)
                    )
                };
                mutationFields[`batchCreate${pluralize(entityName)}`] = {
                    type: new GraphQLList(GraphQLID),
                    args: {
                        [camelize(pluralize(entityName), true)]: {
                            type: new GraphQLList(inputTypesByName[entityName])
                        }
                    }
                };
                mutationFields[`update${entityName}`] = {
                    type: GraphQLBoolean,
                    args: getGraphqlFieldMapFromFields(
                        getNullableFieldsFromFieldsExcludeFun(changeFileToUploadIfNeeded(entityFields), (f) => !f.isId),
                        (f) => isRelationField(f)
                    )
                };
                mutationFields[`batchUpdate${pluralize(entityName)}`] = {
                    type: new GraphQLList(GraphQLID),
                    args: {
                        [camelize(pluralize(entityName), true)]: {
                            type: new GraphQLList(inputTypesByName[entityName])
                        }
                    }
                };
                mutationFields[`remove${entityName}`] = {
                    type: GraphQLBoolean,
                    args: {
                        id: { type: new GraphQLNonNull(GraphQLID) }
                    }
                };
                mutationFields[`batchRemove${pluralize(entityName)}`] = {
                    type: new GraphQLList(GraphQLID),
                    args: {
                        [`${camelize(entityName, true)}Ids`]: {
                            type: new GraphQLList(GraphQLNonNull(GraphQLID))
                        }
                    }
                };
                return mutationFields;
            }, {})
        });
        const schema = new GraphQLSchema({
            query: queryType,
            mutation: mutationType
        });
        return this.extendSchemaWithEntities(schema, entities);
    }

    protected extendSchemaWithEntities(schema: GraphQLSchema, entities: Entity[]): GraphQLSchema {
        const ext = entities.reduce((ext, entity) => {
            entity.fields.forEach((field) => {
                if (isRelationField(field)) {
                    ext += `
extend type ${entity.name} { ${field.name}: ${field.type} }`;
                }
            });
            return ext;
        }, '');
        if (ext) {
            return extendSchema(schema, parse(ext));
        }
        return schema;
    }
    async parseSourceData(data: DataSource, relationship: SourceRelationshipMap): Promise<EntitiesWithSchema> {
        const relationshipConfig = this.getRelationshipConfigFromSource(relationship);
        let entities = await this.getEntitiesFromDataSource(data, relationshipConfig);

        const inputTypesByName = getInputTypesFromEntities(entities);
        const filterTypesByName = getFilterTypesFromData(entities);

        entities = this.getEntitiespWithRelationship(entities, relationshipConfig);
        const schema: GraphQLSchema = this.getSchemaFromEntities(entities, inputTypesByName, filterTypesByName);
        return new EntitiesWithSchema(entities, schema, this);
    }
}
