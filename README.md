# gql-codegen

Generate GraphQL code by mock.js or sqlite, Inspire by [json-graphql-server](https://github.com/marmelab/json-graphql-server)

## install

```
$ npm install gql-codegen -g
```

## generate from mock data use cli

```
$ gql-codegen data2.js
or
$ gql-codegen data2.js --server ./server --front ./src
```

You can also config frontend output

```
$ gql-codegen examples/data2.js --configSample examples/2/config.js
and modify examples/2/config.js, then:
$ gql-codegen examples/data2.js -c examples/2/config.js
```

## generate use Node.js

```
const { generateCodeFromData } = require("gql-codegen");
//arguments like below:
//-------------------------------------------------------------------
//dataFilePath: string = '',
//configPath: string = '',
//serverDir = './server/',
//frontendDir = './src/',
//generateConfigPath = '',
//recursiveLevel = 1,
//templateFiles: {
//    frontendConfig?: string;
//    frontendConfigField?: string;
//    mockDataSource?: string;
//    sqliteDataSource?: string;
//    frontendOperation?: string;
//    frontendOperationField?: string;
//    resolver?: string;
//    app?: string;
//} = {}
//-------------------------------------------------------------------
generateCodeFromData(...);
```

## examples

`$ gql-codegen examples/data2.js --configSample examples/2/config.js`
**->** 
`examples/2/config.js`


`$ gql-codegen examples/data2.js -c examples/2/config.js`
**->**
`examples/2/front/*`,`examples/2/server/*`

## add generate from sqlite on version: 0.0.2+

See `examples/data2sqlite.js`, `examples/data2.db`, `examples/2sqlite/*`
