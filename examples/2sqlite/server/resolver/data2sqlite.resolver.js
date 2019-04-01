const { DateType } = require('gql-codegen');
const { GraphQLUpload } = require('apollo-server-core');
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
        },
        async allMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allMeetings(args, info);
        },
        async nonPaginationMeetings(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationMeetings(args, info);
        },
        async meeting(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.meeting(args, info);
        },
        async allMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allMeetingUsers(args, info);
        },
        async nonPaginationMeetingUsers(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationMeetingUsers(args, info);
        },
        async meetingUser(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.meetingUser(args, info);
        },
        async allOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.allOrgs(args, info);
        },
        async nonPaginationOrgs(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.nonPaginationOrgs(args, info);
        },
        async org(_, args, { dataSources }, info) {
            return await dataSources.defaultApi.org(args, info);
        },
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
        },
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
        },
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
        },
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
        },
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
    Meetingroom: {
        async meetings(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getMeetingsOfMeetingroom({ ...args, meetingroom: entity }, info);
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
    },
    MeetingUser: {
        async meeting(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findMeetingByMeetingUser({ ...args, meetingUser: entity }, info);
        },
        async user(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findUserByMeetingUser({ ...args, meetingUser: entity }, info);
        }
    },
    Org: {
        async parentorg(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.findParentorgByOrg({ ...args, org: entity }, info);
        },
        async subOrgs(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getSubOrgsOfOrg({ ...args, org: entity }, info);
        },
        async users(entity, args, { dataSources }, info) {
            return await dataSources.defaultApi.getUsersOfOrg({ ...args, org: entity }, info);
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
    },
    Date: DateType,
    Upload: GraphQLUpload
};
