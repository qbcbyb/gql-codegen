module.exports = {
    Query: {
        async allMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allMeetingUsers(args, info);
        },
        async nonPaginationMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationMeetingUsers(args, info);
        },
        async meetingUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.meetingUser(args, info);
        }
    },
    Mutation: {
        async createRelatedMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createRelatedMeetingUsers(args, info);
        },
        async updateRelatedMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateRelatedMeetingUsers(args, info);
        },
        async createMeetingUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createMeetingUser(args, info);
        },
        async batchCreateMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreateMeetingUsers(args, info);
        },
        async updateMeetingUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateMeetingUser(args, info);
        },
        async batchUpdateMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdateMeetingUsers(args, info);
        },
        async removeMeetingUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.removeMeetingUser(args, info);
        },
        async batchRemoveMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemoveMeetingUsers(args, info);
        }
    },
    MeetingUser: {
        async meeting(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findMeetingByMeetingUser({ ...args, meetingUser: entity }, info);
        },
        async user(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findUserByMeetingUser({ ...args, meetingUser: entity }, info);
        }
    }
};
