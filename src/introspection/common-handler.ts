import {
    GraphQLInputObjectType,
    GraphQLOutputType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLType,
    GraphQLObjectType,
    GraphQLNamedType
} from 'graphql';
import { pluralize, camelize, singularize } from 'inflection';
import { GraphQLUpload } from 'apollo-server-core';
import { Entity } from '../model/entity';
import { Field, ManyToOneField, ManyToManyField, OneToManyField } from '../model/field';
import { FileType } from './ex-graphql-type';
import { TypeMap } from 'graphql/type/schema';

function getRangeFiltersFromEntities(sourceFields: Field[]) {
    return sourceFields.reduce((fields, sourceField) => {
        const fieldType = sourceField.type;
        if (fieldType && typeof fieldType != 'string') {
            const reaType = getRealType(fieldType);
            const fieldTypeName = getFieldTypeName(reaType);
            if (
                reaType == GraphQLInt ||
                reaType == GraphQLFloat ||
                fieldTypeName == 'Date' ||
                fieldTypeName == 'BigInt'
            ) {
                fields[`${sourceField.name}_lt`] = { type: reaType };
                fields[`${sourceField.name}_lte`] = { type: reaType };
                fields[`${sourceField.name}_gt`] = { type: reaType };
                fields[`${sourceField.name}_gte`] = { type: reaType };
            }
        }
        return fields;
    }, {});
}

export interface InputTypeMap {
    readonly [inputTypeName: string]: GraphQLInputObjectType;
}

/**
 * @example
 * output like :
 * ```
 {
    User:{
        name: 'UserInput',
        fields: {
            firstName: {
                type: GraphQLString
            },
            lastName: {
                type: GraphQLString
            }
        }
    }
 }
 * ```
 *
 * @export
 * @param {Entity[]} entites
 * @returns {InputTypeMap}
 */
export function getInputTypesFromEntities(entites: Entity[]): InputTypeMap {
    return entites.reduce((inputTypeMap, entity) => {
        inputTypeMap[entity.name] = new GraphQLInputObjectType({
            name: `${entity.name}Input`,
            fields: getNullableFieldsFromFieldsExcludeFun(changeFileToUploadIfNeeded(entity.fields)).reduce(
                (inputTypeFields, field) => {
                    inputTypeFields[field.name] = { type: field.type };
                    return inputTypeFields;
                },
                {}
            )
        });
        return inputTypeMap;
    }, {});
}
export function getFilterTypesFromData(entites: Entity[]): InputTypeMap {
    return entites.reduce((inputTypeMap, entity) => {
        inputTypeMap[entity.name] = new GraphQLInputObjectType({
            name: `${entity.name}Filter`,
            fields: {
                q: { type: GraphQLString },
                ids: { type: new GraphQLList(GraphQLID) },
                ...getNullableFieldsFromFieldsExcludeFun(changeFileToUploadIfNeeded(entity.fields)).reduce(
                    (inputTypeFields, field) => {
                        inputTypeFields[field.name] = { type: field.type };
                        return inputTypeFields;
                    },
                    {}
                ),
                ...getRangeFiltersFromEntities(entity.fields)
            }
        });
        return inputTypeMap;
    }, {});
}

export function getNullableFieldsFromFieldsExcludeFun(fields: Field[], fun?: (field: Field) => boolean): Field[] {
    return fields.map((field) => {
        return {
            ...field,
            type:
                (!fun || fun(field)) && field.type instanceof GraphQLNonNull
                    ? (field.type as GraphQLNonNull<any>).ofType
                    : field.type
        };
    });
}
export function getFieldTypeName(fieldType: GraphQLType | string): string | undefined {
    return (fieldType as any).name;
}
export function getUploadIfFieldIsFile(fieldType: GraphQLType | string | undefined): GraphQLType | undefined {
    if (!GraphQLUpload || !fieldType || fieldType instanceof String) {
        return;
    }
    if (fieldType == FileType) {
        return GraphQLUpload;
    }
    if (fieldType instanceof GraphQLNonNull && (fieldType as GraphQLNonNull<GraphQLType>).ofType == FileType) {
        return new GraphQLNonNull(GraphQLUpload);
    }
    if (fieldType instanceof GraphQLList && (fieldType as GraphQLList<GraphQLType>).ofType == FileType) {
        return new GraphQLList(GraphQLUpload);
    }
}
export function getRealTypeName(type: GraphQLType): string {
    if (type instanceof GraphQLList) {
        return `[${getRealTypeName((type as GraphQLList<any>).ofType)}]`;
    } else if (type instanceof GraphQLNonNull) {
        return `${getRealTypeName((type as GraphQLNonNull<any>).ofType)}!`;
    }
    return (type as any).name;
}
export function getRealType(type: GraphQLType): GraphQLType {
    if (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
        return getRealType((type as GraphQLList<any> | GraphQLNonNull<any>).ofType);
    } else {
        return type;
    }
}

export function isFileType(fieldType: GraphQLType): fieldType is typeof FileType {
    return getRealType(fieldType) == FileType;
}
export function hasGraphQLListType(fieldType: GraphQLType): boolean {
    let subType;
    return fieldType instanceof GraphQLList || ((subType = (fieldType as any).ofType) && hasGraphQLListType(subType));
}

export function changeFileToUploadIfNeeded(fields: Field[], fn?: (f: Field) => GraphQLOutputType): Field[] {
    return fields.map((field) => {
        const typeFromFn = fn ? fn(field) : field.type;
        const uploadType = getUploadIfFieldIsFile(typeFromFn);
        const finalType = uploadType ? uploadType : typeFromFn;
        return {
            ...field,
            type: finalType
        };
    });
}
export function getNamedEntityMap(entites: Entity[]): Map<string, Entity> {
    return entites.reduce((entityMap, entity) => {
        entityMap.set(entity.name, entity);
        return entityMap;
    }, new Map<string, Entity>());
}
export function getGraphqlFieldMapFromFields(
    fields: Field[],
    skipFn?: null | ((f: Field) => boolean),
    typefn?: (f: Field) => false | null | undefined | GraphQLType,
    fieldsPreFn?: (fields: Field[]) => Field[]
): { [key: string]: any } {
    if (fieldsPreFn) {
        fields = fieldsPreFn(fields);
    }
    return fields.reduce((fieldsMap, field) => {
        if (!skipFn || !skipFn(field)) {
            fieldsMap[field.name] = {
                name: field.name,
                type: (typefn && typefn(field)) || field.type
            };
        }
        return fieldsMap;
    }, {});
}

export function isFieldHasRelation(field: Field): boolean {
    return field && !!field.hasRelation;
}

export function isRelationField(field: Field): field is ManyToOneField {
    const relationField = field as ManyToOneField;
    return relationField && !!relationField.relatedEntityName && typeof relationField.type === 'string';
}
export function isOneToManyField(field: Field): field is OneToManyField {
    const relationField = field as OneToManyField;
    return relationField && !!relationField.isToManyField;
}
export function getRelationIdsFromFields(fields: Field[], includeFn?: (field: Field) => boolean): Field[] {
    if (includeFn) {
        fields = fields.filter(includeFn);
    }
    return fields.map(
        (f): Field => ({
            key: f.key,
            name: pluralize(f.name),
            type: new GraphQLList(f.type as GraphQLType)
        })
    );
}

export function recursiveHandlerFields(
    entityName: string,
    entityMap: TypeMap,
    recursiveLevel: number,
    handler: (fields: { name: string; subResults: string; isVisibleNormalType: boolean }[]) => string,
    fieldConfig?: any
): string {
    let entityType: GraphQLNamedType;
    if (
        recursiveLevel < 0 ||
        !entityName ||
        !(entityType = entityMap[entityName]) ||
        !(entityType instanceof GraphQLObjectType)
    ) {
        return '';
    }
    const fields = entityType.getFields();
    return handler(
        Object.keys(fields).map((fieldKey) => {
            const field = fields[fieldKey];
            let realType = getRealType(field.type),
                subResults: string = '';
            const isObjectType = realType instanceof GraphQLObjectType;
            const isFieldVisible = !fieldConfig || (fieldConfig.hasOwnProperty(fieldKey) && fieldConfig[fieldKey]);
            if (isFieldVisible && isObjectType) {
                subResults = recursiveHandlerFields(
                    (realType as GraphQLObjectType).name,
                    entityMap,
                    recursiveLevel - 1,
                    handler,
                    fieldConfig && fieldConfig[fieldKey]
                );
            }
            return { name: field.name, subResults, isVisibleNormalType: isFieldVisible && !isObjectType };
        })
    );
}
