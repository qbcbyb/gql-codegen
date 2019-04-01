import * as fs from 'fs';
import * as path from 'path';
import handlebars from '../handlebars';
import { Entity } from '../model/entity';
import { ManyToOneField, OneToManyField, Field, ManyToManyField } from '../model/field';
import {
    isRelationField,
    isOneToManyField,
    isFileType,
    hasGraphQLListType,
    getRelationIdsFromFields,
    isFieldHasRelation
} from '../introspection/common-handler';

export function generateDataSource(entities: Entity[], mockFilePath: string, templatePath: string): string {
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
    let hasFile = false;
    const entityFieldMap: { [entityKey: string]: { [fieldName: string]: string } } = {};
    const renderEntities: {
        entityKey: string;
        entityName: string;
        hasRelationField: boolean;
        manyToOneFields: ManyToOneField[];
        oneToManyFields: OneToManyField[];
        manyToManyIdsFields: string;
        uploadFields: Field[];
        uploadListFields: Field[];
    }[] = entities.map((entity) => {
        hasFile = hasFile || entity.hasFile;
        const manyToOneFields: ManyToOneField[] = [],
            oneToManyFields: OneToManyField[] = [],
            manyToManyIdsFields: Field[] = [],
            uploadFields: Field[] = [],
            uploadListFields: Field[] = [],
            fieldMap: { [fieldName: string]: string } = {};
        entity.fields.forEach((field) => {
            if (!!field.type && typeof field.type !== 'string' && isFileType(field.type)) {
                if (hasGraphQLListType(field.type)) {
                    uploadListFields.push(field);
                } else {
                    uploadFields.push(field);
                }
            }
            if (isRelationField(field)) {
                if (isOneToManyField(field)) {
                    oneToManyFields.push(field);
                } else {
                    manyToOneFields.push(field);
                }
            } else {
                fieldMap[field.name] = field.key;
            }
        });
        if (entity.hasTwoRelationField) {
            manyToManyIdsFields.push(...getRelationIdsFromFields(entity.fields, (f) => isFieldHasRelation(f)));
        }
        entityFieldMap[entity.key] = fieldMap;
        return {
            entityKey: entity.key,
            entityName: entity.name,
            hasRelationField: !!entity.hasRelationField,
            manyToOneFields,
            oneToManyFields,
            manyToManyIdsFields: JSON.stringify(manyToManyIdsFields),
            uploadFields,
            uploadListFields
        };
    });
    return template({
        hasFile,
        mockFilePath,
        entities: renderEntities,
        entityFieldMap: JSON.stringify(entityFieldMap)
    });
}
