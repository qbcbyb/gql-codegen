import * as fs from 'fs';
import * as path from 'path';
import { Entity } from '../model/entity';
import { GraphQLSchema, GraphQLObjectType, GraphQLFieldMap } from 'graphql';
import {
    UnionSourceConfig,
    EntityUnionConfig,
    UnionConfig,
    EntityUnionSourceConfig,
    FrontendFileConfig
} from '../model/front-config';
import { TypeMap } from 'graphql/type/schema';
import handlebars from '../handlebars';
import { getFrontOperationGenerator } from './operation';

function generateFrontOperations(
    operation: string,
    operationTypes: GraphQLFieldMap<
        any,
        any,
        {
            [key: string]: any;
        }
    >,
    typeMaps: TypeMap,
    fileConfig: { [key: string]: FrontendFileConfig },
    unionConfig: { [key: string]: EntityUnionConfig },
    getFilePath: (fileName: string) => string,
    recursiveLevel: number,
    prettierConfig: object,
    template: (any) => string,
    fieldTemplate: (any) => string
) {
    const generateFrontOperation = getFrontOperationGenerator(operation);
    Object.keys(operationTypes).forEach((operationName) => {
        let oneFileConfig;
        if (!fileConfig || !(oneFileConfig = fileConfig[operationName]) || !oneFileConfig.noNeed) {
            generateFrontOperation(
                operationName,
                operationTypes,
                typeMaps,
                fileConfig[operationName],
                unionConfig[operationName],
                getFilePath,
                recursiveLevel,
                prettierConfig,
                template,
                fieldTemplate
            );
        }
    });
}
function generateEntityUnionConfig(
    unionEntity: string | { [key: string]: { exclude?: string[]; include?: string[] } }
): UnionConfig {
    if (typeof unionEntity === 'string') {
        return { [unionEntity]: { entityName: unionEntity } };
    } else {
        return Object.keys(unionEntity).reduce((unionConfig, oneUnionConfigKey) => {
            const oneUnionConfig = unionEntity[oneUnionConfigKey];
            unionConfig[oneUnionConfigKey] = {
                entityName: oneUnionConfigKey,
                exclude: oneUnionConfig.exclude,
                include: oneUnionConfig.include
            };
            return unionConfig;
        }, {});
    }
}
function parseSourceUnionConfig(unionSourceConfig: UnionSourceConfig): { [key: string]: EntityUnionConfig } {
    const config: { [key: string]: EntityUnionConfig } = {};
    Object.keys(unionSourceConfig).forEach((entityName) => {
        const entitySourceConfig: EntityUnionSourceConfig = unionSourceConfig[entityName];
        const unionConfigs: UnionConfig[] = [];
        Object.keys(entitySourceConfig).forEach((unionEntityName) => {
            const unionEntity = entitySourceConfig[unionEntityName];
            if (unionEntity instanceof Array) {
                unionConfigs.push(...unionEntity.map((u) => generateEntityUnionConfig(u)));
            } else {
                unionConfigs.push(generateEntityUnionConfig(unionEntity));
            }
        });
        config[entityName] = { entityName, unionConfigs };
    });
    return config;
}

export function generateFront(
    entities: Entity[],
    schema: GraphQLSchema,
    fileConfig: { [key: string]: FrontendFileConfig },
    unionSourceConfig: UnionSourceConfig,
    outputDir: string,
    recursiveLevel: number,
    prettierConfig: object,
    templatePath?: string,
    fieldTemplatePath?: string
) {
    const getFilePath = (fileName: string): string => path.join(outputDir, `${fileName}.graphql`);

    const typeMaps = schema.getTypeMap();
    const queries = (typeMaps.Query as GraphQLObjectType).getFields(),
        mutations = (typeMaps.Mutation as GraphQLObjectType).getFields();

    const unionConfig = parseSourceUnionConfig(unionSourceConfig);

    const template = handlebars.compile(
        fs.readFileSync(templatePath || path.join(__dirname, '../../template/front/operation.tpl'), 'utf8')
    );
    const fieldTemplate = handlebars.compile(
        fs.readFileSync(fieldTemplatePath || path.join(__dirname, '../../template/front/fields.tpl'), 'utf8')
    );

    generateFrontOperations(
        'query',
        queries,
        typeMaps,
        fileConfig,
        unionConfig,
        getFilePath,
        recursiveLevel,
        prettierConfig,
        template,
        fieldTemplate
    );
    generateFrontOperations(
        'mutation',
        mutations,
        typeMaps,
        fileConfig,
        unionConfig,
        getFilePath,
        recursiveLevel,
        prettierConfig,
        template,
        fieldTemplate
    );
}
