import * as fs from 'fs';
import * as path from 'path';
import handlebars from '../handlebars';
import { recursiveHandlerFields, getRealType } from '../introspection/common-handler';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

export function generateConfig(
    schema: GraphQLSchema,
    recursiveLevel: number,
    templatePath?: string,
    fieldTemplatePath?: string
) {
    const template = handlebars.compile(
        fs.readFileSync(templatePath || path.join(__dirname, '../../template/config/config.tpl'), 'utf8')
    );
    const fieldTemplate = handlebars.compile(
        fs.readFileSync(fieldTemplatePath || path.join(__dirname, '../../template/config/fields.tpl'), 'utf8')
    );
    const typeMaps = schema.getTypeMap();
    const queries = (typeMaps.Query as GraphQLObjectType).getFields(),
        mutations = (typeMaps.Mutation as GraphQLObjectType).getFields(),
        operations: { operationName: string; noNeed: boolean; fields: string; args: string[] }[] = [];

    const addToOperations = (objs) => (operationKey) => {
        const operation = objs[operationKey];
        const operationName = operation.name;
        const noNeed = operationName.startsWith('batch') || operationName.startsWith('nonPagination');
        const entityName = (getRealType(operation.type) as GraphQLObjectType).name;
        const fields = recursiveHandlerFields(entityName, typeMaps, recursiveLevel, (fields) =>
            fieldTemplate({ fields, not_mutation: objs == queries })
        );
        operations.push({ operationName, args: operation.args.map((a) => a.name), fields: fields || '', noNeed });
    };

    Object.keys(queries).forEach(addToOperations(queries));
    Object.keys(mutations).forEach(addToOperations(mutations));

    return template({ operations });
}
