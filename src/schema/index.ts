import { writeFileSync } from 'fs';
import {
    GraphQLSchema,
    printType,
    GraphQLObjectType,
    isIntrospectionType,
    GraphQLInputObjectType,
    print,
    isSpecifiedScalarType,
    GraphQLScalarType
} from 'graphql';
import { join } from 'path';
import * as prettier from 'prettier';
import { getRealType } from '../introspection/common-handler';

const encoding = 'utf8';

const schemaFileName = 'schema';
function getTypeNameExcludeFilterAndPage(typeName: string): string {
    if (typeName == 'Query' || typeName == 'Mutation') {
        return schemaFileName;
    }
    return typeName.replace(/(Page|Input|Filter)$/g, '');
}

export function generateSchema(schemaDir: string, schema: GraphQLSchema, prettierConfig: object) {
    const typeMaps = schema.getTypeMap();
    const fileMap: { [key: string]: { imports: Set<string>; contents: string[] } } = {};
    const getFileContent = (fileName) =>
        fileMap[fileName] || (fileMap[fileName] = { imports: new Set<string>(), contents: [] });
    const typeNames = Object.keys(typeMaps);
    typeNames.forEach((typeName: string) => {
        if (typeName.startsWith('__')) {
            return;
        }
        const gqlType = typeMaps[typeName];
        const fileName = getTypeNameExcludeFilterAndPage(typeName);
        const fileContent = getFileContent(fileName);

        if (gqlType instanceof GraphQLObjectType) {
            const gqlTypeFields = gqlType.getFields();
            Object.keys(gqlTypeFields).forEach((fieldKey) => {
                const fieldType = getRealType(gqlTypeFields[fieldKey].type);
                if (fieldType instanceof GraphQLObjectType) {
                    const fieldTypeName = getTypeNameExcludeFilterAndPage(fieldType.name);
                    if (fieldTypeName !== fileName) {
                        fileContent.imports.add(`# import * from '${fieldTypeName}.graphql'`);
                    }
                }
            });
            fileContent.contents.push(printType(gqlType));
        } else if (gqlType instanceof GraphQLInputObjectType) {
            fileContent.contents.push(printType(gqlType));
        } else if (gqlType instanceof GraphQLScalarType && !isSpecifiedScalarType(gqlType)) {
            getFileContent(schemaFileName).contents.push(printType(gqlType));
        }
    });
    Object.keys(fileMap).forEach((fileName) => {
        const fileContent = fileMap[fileName];
        if (fileContent.imports.size && fileContent.contents.length) {
            const fileData = Array.from(fileContent.imports)
                .join('\n')
                .concat('\n\n')
                .concat(fileContent.contents.join('\n\n'));
            writeFileSync(join(schemaDir, `${fileName}.graphql`), prettier.format(fileData, prettierConfig), encoding);
        }
    });
}
