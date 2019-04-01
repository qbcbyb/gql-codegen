#!/usr/bin/env node

import * as commander from 'commander';
import { generateCodeFromData } from './index';
import { existsSync, statSync } from 'fs';

commander
    .name('gql-codegen')
    .version(require('../package.json').version)
    .arguments('<dataSourcePath>')
    .action(function(dataSourcePath, options) {
        generateCodeFromData(
            dataSourcePath,
            options.config,
            options.server,
            options.front,
            options.configSample,
            options.fieldLevel + 1
        );
    })
    .option('--configSample <generateConfigPath>', 'The path to generate the sample config file')
    .option('-c, --config <configPath>', 'The path of config file to use')
    .option('--server <serverDir>', 'The dir for backend code to generate', './server/')
    .option('--front <frontendDir>', 'The dir for frontend code to generate', './src/')
    .option('--fieldLevel <fieldLevel>', 'The recursive level of frontend code', (i) => parseInt(i, 10), 1)

    .parse(process.argv);
