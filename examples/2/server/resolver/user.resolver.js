module.exports = {
    Query: {
        async allUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allUsers(args, info);
        },
        async nonPaginationUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationUsers(args, info);
        },
        async user(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.user(args, info);
        }
    },
    Mutation: {
        async createRelatedUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createRelatedUsers(args, info);
        },
        async updateRelatedUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateRelatedUsers(args, info);
        },
        async createUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createUser(args, info);
        },
        async batchCreateUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreateUsers(args, info);
        },
        async updateUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateUser(args, info);
        },
        async batchUpdateUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdateUsers(args, info);
        },
        async removeUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.removeUser(args, info);
        },
        async batchRemoveUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemoveUsers(args, info);
        }
    },
    User: {
        async org(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findOrgByUser({ ...args, user: entity }, info);
        },
        async meetingUsers(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getMeetingUsersOfUser({ ...args, user: entity }, info);
        },
        async relatedMeetings(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getRelatedMeetingsOfUser({ ...args, user: entity }, info);
        }
    }
};
