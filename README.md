# gql-codegen

## install

```
$ npm install gql-codegen -g
```

## generate from mock data

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
