module.exports = {
    Query: {
        async allOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allOrgs(args, info);
        },
        async nonPaginationOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationOrgs(args, info);
        },
        async org(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.org(args, info);
        }
    },
    Mutation: {
        async createRelatedOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createRelatedOrgs(args, info);
        },
        async updateRelatedOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateRelatedOrgs(args, info);
        },
        async createOrg(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createOrg(args, info);
        },
        async batchCreateOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreateOrgs(args, info);
        },
        async updateOrg(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateOrg(args, info);
        },
        async batchUpdateOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdateOrgs(args, info);
        },
        async removeOrg(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.removeOrg(args, info);
        },
        async batchRemoveOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemoveOrgs(args, info);
        }
    },
    Org: {
        async parentOrg(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findParentOrgByOrg({ ...args, org: entity }, info);
        },
        async subOrgs(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getSubOrgsOfOrg({ ...args, org: entity }, info);
        },
        async users(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getUsersOfOrg({ ...args, org: entity }, info);
        }
    }
};
