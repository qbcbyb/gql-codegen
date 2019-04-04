import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as prettier from 'prettier';
import prettierConfig from './prettierrc';
import { camelize } from 'inflection';
import { parseSourceData } from './introspection/data-handler';
import { generateConfig } from './config';
import { generateResolver } from './resolver';
import { generateDataSource } from './data-source';
import { generateFront } from './front';
import handlebars from './handlebars';
import { generateSchema } from './schema';
import { EntitiesWithSchema } from './model/entities-with-schema';

const encoding = 'utf8';

const resolvePath = (subPath: string): string => {
    if (!subPath) return '';
    const result = path.resolve(process.cwd(), subPath);
    return result;
};

const mkdirIfNeeded = (parentDir) => (dir) => {
    const target = path.join(parentDir, dir);
    if (!fs.existsSync(target)) {
        mkdirp.sync(target);
    }
};

export { FileType, File, DateType } from './introspection/ex-graphql-type';

export { applyFilters } from './data-source/applyFilters';

export async function getEntitiesAndSchemaFromData(dataFilePath: string = ''): Promise<EntitiesWithSchema> {
    dataFilePath = resolvePath(dataFilePath);
    if (!fs.existsSync(dataFilePath) || !fs.statSync(dataFilePath).isFile()) {
        throw new Error('No json data file found');
    }
    const data = require(dataFilePath);
    const relationshipConfig = data.__relationships || {};
    delete data.__relationships;
    return await parseSourceData(data, relationshipConfig);
}

export const generateCodeFromData = async function(
    dataFilePath: string = '',
    configPath: string = '',
    serverDir = './server/',
    frontendDir = './src/',
    generateConfigPath = '',
    recursiveLevel = 1,
    templateFiles: {
        frontendConfig?: string;
        frontendConfigField?: string;
        mockDataSource?: string;
        sqliteDataSource?: string;
        frontendOperation?: string;
        frontendOperationField?: string;
        resolver?: string;
        app?: string;
    } = {}
) {
    dataFilePath = resolvePath(dataFilePath);
    configPath = resolvePath(configPath);
    serverDir = resolvePath(serverDir);
    frontendDir = resolvePath(frontendDir);
    frontendDir = resolvePath(frontendDir);
    generateConfigPath = resolvePath(generateConfigPath);

    if (!fs.existsSync(dataFilePath) || !fs.statSync(dataFilePath).isFile()) {
        throw new Error('No json data file found');
    }

    if (recursiveLevel < 1 || recursiveLevel > 5) {
        throw new Error('fieldLevel must in [1...5]');
    }

    const data = require(dataFilePath);
    const relationshipConfig = data.__relationships || {};
    delete data.__relationships;

    const fileName = path.basename(dataFilePath, path.extname(dataFilePath));

    const { entities, schema: graphqlSchema, reader: dataReader } = await parseSourceData(data, relationshipConfig);

    // 生成配置文件
    if (generateConfigPath) {
        const configDir = path.dirname(generateConfigPath);
        if (!fs.existsSync(configDir)) {
            mkdirp(configDir);
        }
        fs.writeFileSync(
            generateConfigPath,
            prettier.format(
                generateConfig(
                    graphqlSchema,
                    recursiveLevel,
                    templateFiles.frontendConfig,
                    templateFiles.frontendConfigField
                ),
                prettierConfig
            ),
            encoding
        );
        return;
    }
    const configFileCanUse = fs.existsSync(configPath) && fs.statSync(configPath).isFile();
    if (configPath && !configFileCanUse) {
        throw new Error('configPath provide a non file path');
    }
    const config: { files?: {}; unions?: {} } = configFileCanUse ? require(configPath) : {};

    ['schema', 'resolver', 'dataSource'].forEach(mkdirIfNeeded(serverDir));
    ['graphql'].forEach(mkdirIfNeeded(frontendDir));

    //生成schema
    generateSchema(path.join(serverDir, 'schema'), graphqlSchema, {
        ...prettierConfig,
        parser: 'graphql'
    });

    //在resolver目录下生成默认index.js
    const resolverIndexFile = path.join(serverDir, 'resolver/index.js');
    if (!fs.existsSync(resolverIndexFile)) {
        fs.copyFileSync(path.join(__dirname, '../template/server/resolver.template.js'), resolverIndexFile);
    }
    //生成 resolver
    generateResolver(path.join(serverDir, `resolver`), entities, prettierConfig, templateFiles.resolver);
    // fs.writeFileSync(
    //     path.join(serverDir, `resolver/${fileName}.resolver.js`),
    //     prettier.format(generateResolver(entities, templateFiles.resolver), prettierConfig),
    //     encoding
    // );

    //生成dataSource
    fs.writeFileSync(
        path.join(serverDir, `dataSource/${camelize(fileName)}Api.js`),
        prettier.format(
            generateDataSource(
                entities,
                path
                    .relative(path.join(serverDir, 'dataSource'), dataReader.dataFilePathHandler(data, dataFilePath))
                    .replace(/\\+/g, '/'),
                dataReader.getTemplateFromConfig(templateFiles)
            ),
            prettierConfig
        ),
        encoding
    );

    //生成前端graphql代码
    generateFront(
        graphqlSchema,
        config.files || {},
        config.unions || {},
        path.join(frontendDir, 'graphql'),
        recursiveLevel,
        {
            ...prettierConfig,
            parser: 'graphql'
        },
        templateFiles.frontendOperation,
        templateFiles.frontendOperationField
    );

    //生成app.js
    const appFilePath = path.join(serverDir, 'app.js');
    if (!fs.existsSync(appFilePath)) {
        const template = handlebars.compile(
            fs.readFileSync(
                templateFiles.app ? templateFiles.app : path.join(__dirname, '../template/server/app.js.tpl'),
                'utf8'
            )
        );
        fs.writeFileSync(
            appFilePath,
            prettier.format(template({ dataSourceFileName: `${camelize(fileName)}Api` }), prettierConfig),
            encoding
        );
    }
};
