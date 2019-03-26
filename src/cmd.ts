#!/usr/bin/env node

import * as path from 'path';
import { generateCodeFromData } from './index';

let config: { files?: {}; unions?: {} } = {},
    serverDir = './server/',
    frontendDir = './src/',
    generateConfigPath = '',
    subFieldLevel = 1;

if (process.argv.includes('--configSample')) {
    generateConfigPath = path.join(process.cwd(), process.argv[process.argv.indexOf('--configSample') + 1]);
}
if (process.argv.includes('-c')) {
    config = require(path.join(process.cwd(), process.argv[process.argv.indexOf('-c') + 1]));
}
if (process.argv.includes('--server')) {
    serverDir = path.join(process.cwd(), process.argv[process.argv.indexOf('--server') + 1]);
}
if (process.argv.includes('--front')) {
    frontendDir = path.join(process.cwd(), process.argv[process.argv.indexOf('--front') + 1]);
}
if (process.argv.includes('--fieldLevel')) {
    subFieldLevel = parseInt(process.argv[process.argv.indexOf('--fieldLevel') + 1]) - 1;
}

generateCodeFromData(config, serverDir, frontendDir, generateConfigPath, subFieldLevel);
