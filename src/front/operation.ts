import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { GraphQLObjectType, GraphQLFieldMap, GraphQLField } from 'graphql';
import { pluralize, camelize, singularize } from 'inflection';
import { getRealType, recursiveHandlerFields, getRealTypeName } from '../introspection/common-handler';
import { EntityUnionConfig, FrontendFileConfig, UnionConfig } from '../model/front-config';
import { TypeMap } from 'graphql/type/schema';

function addConnectorIfNonNull(str) {
    return str ? `_${str}` : '';
}

interface ArgumentConfig {
    readonly name: string;
    readonly type: string;
    readonly alias: string;
}

interface UnionConfigForTemplate {
    readonly fields: string;
    readonly operationName: string;
    readonly args: ArgumentConfig[];
}

const generateArgsAndFields = (
    not_mutation: boolean,
    typeMaps: TypeMap,
    recursiveLevel: number,
    fieldTemplate: (any) => string,
    operationType: GraphQLField<
        any,
        any,
        {
            [key: string]: any;
        }
    >,
    excludeArgs: string[],
    includeArgs: string[],
    fieldConfig: object
): [string, ArgumentConfig[]] => {
    if (!operationType) return ['', []];
    const fieldType = getRealType(operationType.type);
    const fieldKey = fieldType instanceof GraphQLObjectType ? fieldType.name : '';
    const fieldsStr =
        (fieldKey &&
            recursiveHandlerFields(
                fieldKey,
                typeMaps,
                recursiveLevel,
                (fields) => {
                    return fieldTemplate({ fields, not_mutation });
                },
                fieldConfig
            )) ||
        '';

    const sourceArgs = operationType.args || [];
    const resultArgs: ArgumentConfig[] = [];
    if (sourceArgs && sourceArgs.length) {
        sourceArgs.forEach((a) => {
            const argName = a.name;
            let needInclude = false;
            if (includeArgs) {
                if (includeArgs.includes(argName)) {
                    needInclude = true;
                }
            } else if (excludeArgs) {
                if (!excludeArgs.includes(argName)) {
                    needInclude = true;
                }
            } else {
                needInclude = true;
            }
            if (needInclude) {
                resultArgs.push({ name: argName, type: getRealTypeName(a.type), alias: `$${argName}` });
            }
        });
    }
    return [fieldsStr, resultArgs];
};

const generateOneFile = (
    operation,
    operationName: string,
    operationTypes: GraphQLFieldMap<
        any,
        any,
        {
            [key: string]: any;
        }
    >,
    typeMaps: TypeMap,
    recursiveLevel: number,
    prettierConfig: object,
    template: (any) => string,
    fieldTemplate: (any) => string,
    getFilePath,
    originFields: string,
    originArgs: ArgumentConfig[],
    not_mutation: boolean,
    index?,
    unionConfig?: UnionConfig
) => {
    const unionObjectArr: UnionConfigForTemplate[] = [];
    const finalArgsTop = [...originArgs];
    const reg = /(\d+)$/g;
    const unionObjectKeys: string[] = [];
    if (unionConfig) {
        Object.keys(unionConfig).forEach((unionOperationName) => {
            const { exclude = [], include = [], fields: outputFields = {} } = unionConfig[unionOperationName];
            const fieldData = operationTypes[unionOperationName];
            unionObjectKeys.push(camelize(unionOperationName));
            const [unionObjFields, unionArgs] = generateArgsAndFields(
                not_mutation,
                typeMaps,
                recursiveLevel,
                fieldTemplate,
                fieldData,
                exclude,
                include,
                outputFields
            );

            unionObjectArr.push({ fields: unionObjFields, operationName: unionOperationName, args: unionArgs });

            unionArgs.reduce((_finalArgsTop, { name, alias, type }) => {
                for (const i of _finalArgsTop) {
                    if (i.alias === alias) {
                        if (i.type === type) {
                            //参数别名及类型都一致，可复用参数，无需再添加
                            return _finalArgsTop;
                        }
                        break;
                    }
                }
                if (_finalArgsTop.some((i) => i.alias === alias && i.type !== type)) {
                    reg.lastIndex = 0;
                    const exec = reg.exec(alias);
                    if (exec) {
                        alias = alias.replace(reg, String(parseInt(exec[0], 10) + 1));
                    } else {
                        alias += 1;
                    }
                }
                _finalArgsTop.push({ name, alias, type });
                return _finalArgsTop;
            }, finalArgsTop);
        });
    }
    const fileName = operationName + addConnectorIfNonNull(unionObjectKeys.join('_') + (index || ''));

    fs.writeFileSync(
        getFilePath(fileName),
        prettier.format(
            template({
                operation,
                not_mutation,
                fields: originFields,
                operationName,
                finalArgsTop,
                args: originArgs,
                unionObjectArr
            }),
            prettierConfig
        ),
        'utf-8'
    );
};
export function getFrontOperationGenerator(operation) {
    return (
        operationName: string,
        operationTypes: GraphQLFieldMap<
            any,
            any,
            {
                [key: string]: any;
            }
        >,
        typeMaps: TypeMap,
        frontendFileConfig: FrontendFileConfig | undefined,
        entityUnionConfig: EntityUnionConfig | undefined,
        getFilePath: (fileName: string) => string,
        recursiveLevel: number,
        prettierConfig: object,
        template: (any) => string,
        fieldTemplate: (any) => string
    ) => {
        const operationType = operationTypes[operationName];
        const not_mutation = operation != 'mutation';

        const { exclude = [], include = [], fields: outputFields = {} } = frontendFileConfig || {};
        const [originFields, originArgs] = generateArgsAndFields(
            not_mutation,
            typeMaps,
            recursiveLevel,
            fieldTemplate,
            operationType,
            exclude,
            include,
            outputFields
        );

        generateOneFile(
            operation,
            operationName,
            operationTypes,
            typeMaps,
            recursiveLevel,
            prettierConfig,
            template,
            fieldTemplate,
            getFilePath,
            originFields,
            originArgs,
            not_mutation
        );
        if (entityUnionConfig) {
            entityUnionConfig.unionConfigs.forEach((f, k) => {
                generateOneFile(
                    operation,
                    operationName,
                    operationTypes,
                    typeMaps,
                    recursiveLevel,
                    prettierConfig,
                    template,
                    fieldTemplate,
                    getFilePath,
                    originFields,
                    originArgs,
                    not_mutation,
                    k + 1,
                    f
                );
            });
        }
    };
}
