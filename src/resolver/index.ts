import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import handlebars from '../handlebars';
import { Entity } from '../model/entity';
import { ManyToOneField, OneToManyField } from '../model/field';
import { isRelationField, isOneToManyField } from '../introspection/common-handler';

export function generateResolver(entities: Entity[], templatePath?: string): string {
    const template = handlebars.compile(
        fs.readFileSync(templatePath || path.join(__dirname, '../../template/resolver/resolver.tpl'), 'utf8')
    );
    let hasDate = false,
        hasBigInt = false,
        hasJSON = false,
        hasFile = false;
    const renderEntities: {
        entityKey: string;
        entityName: string;
        hasRelationField: boolean;
        manyToOneFields: ManyToOneField[];
        oneToManyFields: OneToManyField[];
    }[] = entities.map((entity) => {
        hasDate = hasDate || entity.hasDate;
        hasBigInt = hasBigInt || entity.hasBigInt;
        hasJSON = hasJSON || entity.hasJSON;
        hasFile = hasFile || entity.hasFile;
        const manyToOneFields: ManyToOneField[] = [],
            oneToManyFields: OneToManyField[] = [];
        entity.fields.forEach((field) => {
            if (isRelationField(field)) {
                if (isOneToManyField(field)) {
                    oneToManyFields.push(field);
                } else {
                    manyToOneFields.push(field);
                }
            }
        });
        return {
            entityKey: entity.key,
            entityName: entity.name,
            hasRelationField: !!entity.hasRelationField,
            manyToOneFields,
            oneToManyFields
        };
    });
    return template({
        entities: renderEntities,
        hasDate,
        hasBigInt,
        hasJSON,
        hasFile
    });
}
