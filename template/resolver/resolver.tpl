{{#if hasJSON}}
const GraphQLJSON = require('graphql-type-json');
{{/if}}
{{#if hasBigInt}}
const BigInt = require('graphql-bigint');
{{/if}}
{{#if hasDate}}
const { DateType } = require('gql-codegen');
{{/if}}
{{#if hasFile}}
const { GraphQLUpload } = require('apollo-server-core');
{{/if}}
module.exports = {
    {{#if entities}}
    Query: {
        {{#each entities}}
        async all{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.all{{pluralize entityName}}(args);
        },
        async nonPagination{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPagination{{pluralize entityName}}(args);
        },
        async {{littleCamelize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.{{littleCamelize entityName}}(args);
        },
        {{/each}}
    },
    Mutation: {
        {{#each entities}}
        {{#if hasRelationField}}
        async createRelated{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.createRelated{{pluralize entityName}}(args);
        },
        async updateRelated{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateRelated{{pluralize entityName}}(args);
        },
        {{/if}}
        async create{{entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.create{{entityName}}(args);
        },
        async batchCreate{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreate{{pluralize entityName}}(args);
        },
        async update{{entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.update{{entityName}}(args);
        },
        async batchUpdate{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdate{{pluralize entityName}}(args);
        },
        async remove{{entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.remove{{entityName}}(args);
        },
        async batchRemove{{pluralize entityName}}(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemove{{pluralize entityName}}(args);
        },
        {{/each}}
    },
    {{#each entities}}
    {{entityName}}: {
        {{#if manyToOneFields}}
        {{#each manyToOneFields}}
        async {{name}}(entity, args, { dataSources }) {
            return await dataSources.defaultApi.find{{camelize name}}By{{../entityName}}({ ...args, {{littleCamelize ../entityName}}: entity });
        },
        {{/each}}
        {{/if}}
        {{#if oneToManyFields}}
        {{#each oneToManyFields}}
        async {{name}}(entity, args, { dataSources }) {
            return await dataSources.defaultApi.get{{#pluralize name}}{{camelize this}}{{/pluralize}}Of{{../entityName}}({ ...args, {{littleCamelize ../entityName}}: entity });
        },
        {{/each}}
        {{/if}}
    },
    {{/each}}
    {{/if}}
    {{#if hasDate}}
    Date: DateType,
    {{/if}}
    {{#if hasJSON}}
    JSON: GraphQLJSON,
    {{/if}}
    {{#if hasBigInt}}
    BigInt,
    {{/if}}
    {{#if hasFile}}
    Upload: GraphQLUpload,
    {{/if}}
};