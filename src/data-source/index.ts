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

export function generateDataSource(entities: Entity[], mockFilePath: string, templatePath?: string): string {
    const template = handlebars.compile(
        fs.readFileSync(templatePath || path.join(__dirname, '../../template/data-source/data-source.tpl'), 'utf8')
    );
    let hasFile = false;
    const renderEntities: {
        entityKey: string;
        entityName: string;
        hasRelationField: boolean;
        manyToOneFields: ManyToOneField[];
        oneToManyFields: OneToManyField[];
        manyToManyIdsFields: Field[];
        uploadFields: Field[];
        uploadListFields: Field[];
    }[] = entities.map((entity) => {
        hasFile = hasFile || entity.hasFile;
        const manyToOneFields: ManyToOneField[] = [],
            oneToManyFields: OneToManyField[] = [],
            manyToManyIdsFields: Field[] = [],
            uploadFields: Field[] = [],
            uploadListFields: Field[] = [];
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
            }
        });
        if (entity.hasTwoRelationField) {
            manyToManyIdsFields.push(...getRelationIdsFromFields(entity.fields, (f) => isFieldHasRelation(f)));
        }
        return {
            entityKey: entity.key,
            entityName: entity.name,
            hasRelationField: !!entity.hasRelationField,
            manyToOneFields,
            oneToManyFields,
            manyToManyIdsFields,
            uploadFields,
            uploadListFields
        };
    });
    return template({
        hasFile,
        mockFilePath,
        entities: renderEntities
    });
}
