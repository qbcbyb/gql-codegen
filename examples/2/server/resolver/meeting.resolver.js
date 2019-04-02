module.exports = {
    Query: {
        async allMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allMeetings(args, info);
        },
        async nonPaginationMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationMeetings(args, info);
        },
        async meeting(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.meeting(args, info);
        }
    },
    Mutation: {
        async createRelatedMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createRelatedMeetings(args, info);
        },
        async updateRelatedMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateRelatedMeetings(args, info);
        },
        async createMeeting(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createMeeting(args, info);
        },
        async batchCreateMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreateMeetings(args, info);
        },
        async updateMeeting(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateMeeting(args, info);
        },
        async batchUpdateMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdateMeetings(args, info);
        },
        async removeMeeting(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.removeMeeting(args, info);
        },
        async batchRemoveMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemoveMeetings(args, info);
        }
    },
    Meeting: {
        async meetingroom(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findMeetingroomByMeeting({ ...args, meeting: entity }, info);
        },
        async meetingUsers(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getMeetingUsersOfMeeting({ ...args, meeting: entity }, info);
        },
        async relatedUsers(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getRelatedUsersOfMeeting({ ...args, meeting: entity }, info);
        }
    }
};
