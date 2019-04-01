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
        async all{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.all{{pluralize entityName}}(args, info);
        },
        async nonPagination{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPagination{{pluralize entityName}}(args, info);
        },
        async {{littleCamelize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.{{littleCamelize entityName}}(args, info);
        },
        {{/each}}
    },
    Mutation: {
        {{#each entities}}
        {{#if hasRelationField}}
        async createRelated{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createRelated{{pluralize entityName}}(args, info);
        },
        async updateRelated{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateRelated{{pluralize entityName}}(args, info);
        },
        {{/if}}
        async create{{entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.create{{entityName}}(args, info);
        },
        async batchCreate{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreate{{pluralize entityName}}(args, info);
        },
        async update{{entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.update{{entityName}}(args, info);
        },
        async batchUpdate{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdate{{pluralize entityName}}(args, info);
        },
        async remove{{entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.remove{{entityName}}(args, info);
        },
        async batchRemove{{pluralize entityName}}(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemove{{pluralize entityName}}(args, info);
        },
        {{/each}}
    },
    {{#each entities}}
    {{entityName}}: {
        {{#if manyToOneFields}}
        {{#each manyToOneFields}}
        async {{name}}(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.find{{camelize name}}By{{../entityName}}({ ...args, {{littleCamelize ../entityName}}: entity }, info);
        },
        {{/each}}
        {{/if}}
        {{#if oneToManyFields}}
        {{#each oneToManyFields}}
        async {{name}}(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.get{{#pluralize name}}{{camelize this}}{{/pluralize}}Of{{../entityName}}({ ...args, {{littleCamelize ../entityName}}: entity }, info);
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