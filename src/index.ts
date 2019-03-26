import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { printSchema } from 'graphql';
import * as prettier from 'prettier';
import prettierConfig from './prettierrc';
import { pluralize, camelize, singularize } from 'inflection';
import { parseSourceData } from './introspection/data-handler';
import { getNamedEntityMap } from './introspection/common-handler';
import { generateConfig } from './config';
import { generateResolver } from './resolver';
import { generateDataSource } from './data-source';
import { generateFront } from './front';
import handlebars from './handlebars';

const encoding = 'utf8';

const mkdirIfNeeded = (parentDir) => (dir) => {
    const target = path.join(parentDir, dir);
    if (!fs.existsSync(target)) {
        mkdirp.sync(target);
    }
};

export { FileType, File, DateType } from './introspection/ex-graphql-type';

export { applyFilters } from './data-source/applyFilters';

export const generateCodeFromData = async function(
    config: { files?: {}; unions?: {} } = {},
    serverDir = './server/',
    frontendDir = './src/',
    generateConfigPath = '',
    subFieldLevel = 1,
    templateFiles: {
        frontendConfig?: string;
        frontendConfigField?: string;
        dataSource?: string;
        frontendOperation?: string;
        frontendOperationField?: string;
        resolver?: string;
        app?: string;
    } = {}
) {
    let dataFilePath = path.join(process.cwd(), process.argv.length > 2 ? process.argv[2] : '');
    if (!fs.existsSync(dataFilePath)) {
        throw new Error('No json data file found');
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
                    subFieldLevel,
                    templateFiles.frontendConfig,
                    templateFiles.frontendConfigField
                ),
                prettierConfig
            ),
            encoding
        );
        return;
    }

    ['schema', 'resolver', 'dataSource'].forEach(mkdirIfNeeded(serverDir));
    ['graphql'].forEach(mkdirIfNeeded(frontendDir));

    //生成schema
    fs.writeFileSync(
        path.join(serverDir, `schema/schema.graphql`),
        prettier.format(printSchema(graphqlSchema), {
            ...prettierConfig,
            parser: 'graphql'
        }),
        encoding
    );

    //在resolver目录下生成默认index.js
    const resolverIndexFile = path.join(serverDir, 'resolver/index.js');
    if (!fs.existsSync(resolverIndexFile)) {
        fs.copyFileSync(path.join(__dirname, '../template/server/resolver.template.js'), resolverIndexFile);
    }
    //生成 resolver
    fs.writeFileSync(
        path.join(serverDir, `resolver/${fileName}.resolver.js`),
        prettier.format(generateResolver(entities, templateFiles.resolver), prettierConfig),
        encoding
    );

    //生成dataSource
    fs.writeFileSync(
        path.join(serverDir, `dataSource/${camelize(fileName)}Api.js`),
        prettier.format(
            generateDataSource(
                entities,
                path.relative(path.join(serverDir, 'dataSource'), dataFilePath).replace(/\\+/g, '/'),
                templateFiles.dataSource
            ),
            prettierConfig
        ),
        encoding
    );

    //生成前端graphql代码
    generateFront(
        entities,
        graphqlSchema,
        config.files || {},
        config.unions || {},
        path.join(frontendDir, 'graphql'),
        subFieldLevel,
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
