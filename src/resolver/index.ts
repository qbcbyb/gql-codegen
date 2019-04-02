import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { underscore, dasherize } from 'inflection';
import handlebars from '../handlebars';
import { Entity } from '../model/entity';
import { ManyToOneField, OneToManyField } from '../model/field';
import { isRelationField, isOneToManyField } from '../introspection/common-handler';

const encoding = 'utf8';

export function generateResolver(
    resolverDir: string,
    entities: Entity[],
    prettierConfig: object,
    templatePath?: string
) {
    const template = handlebars.compile(
        fs.readFileSync(templatePath || path.join(__dirname, '../../template/resolver/resolver.tpl'), 'utf8')
    );
    let hasDate = false,
        hasBigInt = false,
        hasJSON = false,
        hasFile = false;
    entities.forEach((entity) => {
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
        fs.writeFileSync(
            path.join(resolverDir, `${dasherize(underscore(entity.name))}.resolver.js`),
            prettier.format(
                template({
                    entities: [
                        {
                            entityKey: entity.key,
                            entityName: entity.name,
                            hasRelationField: !!entity.hasRelationField,
                            manyToOneFields,
                            oneToManyFields
                        }
                    ]
                }),
                prettierConfig
            ),
            encoding
        );
    });

    fs.writeFileSync(
        path.join(resolverDir, `scalar.resolver.js`),
        prettier.format(
            template({
                hasDate,
                hasBigInt,
                hasJSON,
                hasFile
            }),
            prettierConfig
        ),
        encoding
    );
}
