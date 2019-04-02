module.exports = {
    Query: {
        async allMeetingrooms(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allMeetingrooms(args, info);
        },
        async nonPaginationMeetingrooms(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationMeetingrooms(args, info);
        },
        async meetingroom(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.meetingroom(args, info);
        }
    },
    Mutation: {
        async createMeetingroom(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.createMeetingroom(args, info);
        },
        async batchCreateMeetingrooms(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchCreateMeetingrooms(args, info);
        },
        async updateMeetingroom(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.updateMeetingroom(args, info);
        },
        async batchUpdateMeetingrooms(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchUpdateMeetingrooms(args, info);
        },
        async removeMeetingroom(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.removeMeetingroom(args, info);
        },
        async batchRemoveMeetingrooms(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.batchRemoveMeetingrooms(args, info);
        }
    },
    Meetingroom: {
        async meetings(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getMeetingsOfMeetingroom({ ...args, meetingroom: entity }, info);
        }
    }
};
