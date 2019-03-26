const { DateType } = require('gql-codegen');
const { GraphQLUpload } = require('apollo-server-core');
module.exports = {
    Query: {
        async allMeetingrooms(_, args, { dataSources }) {
            return await dataSources.defaultApi.allMeetingrooms(args);
        },
        async nonPaginationMeetingrooms(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPaginationMeetingrooms(args);
        },
        async meetingroom(_, args, { dataSources }) {
            return await dataSources.defaultApi.meetingroom(args);
        },
        async allMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.allMeetings(args);
        },
        async nonPaginationMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPaginationMeetings(args);
        },
        async meeting(_, args, { dataSources }) {
            return await dataSources.defaultApi.meeting(args);
        },
        async allMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.allMeetingUsers(args);
        },
        async nonPaginationMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPaginationMeetingUsers(args);
        },
        async meetingUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.meetingUser(args);
        },
        async allOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.allOrgs(args);
        },
        async nonPaginationOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPaginationOrgs(args);
        },
        async org(_, args, { dataSources }) {
            return await dataSources.defaultApi.org(args);
        },
        async allUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.allUsers(args);
        },
        async nonPaginationUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.nonPaginationUsers(args);
        },
        async user(_, args, { dataSources }) {
            return await dataSources.defaultApi.user(args);
        }
    },
    Mutation: {
        async createMeetingroom(_, args, { dataSources }) {
            return await dataSources.defaultApi.createMeetingroom(args);
        },
        async batchCreateMeetingrooms(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreateMeetingrooms(args);
        },
        async updateMeetingroom(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateMeetingroom(args);
        },
        async batchUpdateMeetingrooms(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdateMeetingrooms(args);
        },
        async removeMeetingroom(_, args, { dataSources }) {
            return await dataSources.defaultApi.removeMeetingroom(args);
        },
        async batchRemoveMeetingrooms(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemoveMeetingrooms(args);
        },
        async createRelatedMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.createRelatedMeetings(args);
        },
        async updateRelatedMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateRelatedMeetings(args);
        },
        async createMeeting(_, args, { dataSources }) {
            return await dataSources.defaultApi.createMeeting(args);
        },
        async batchCreateMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreateMeetings(args);
        },
        async updateMeeting(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateMeeting(args);
        },
        async batchUpdateMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdateMeetings(args);
        },
        async removeMeeting(_, args, { dataSources }) {
            return await dataSources.defaultApi.removeMeeting(args);
        },
        async batchRemoveMeetings(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemoveMeetings(args);
        },
        async createRelatedMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.createRelatedMeetingUsers(args);
        },
        async updateRelatedMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateRelatedMeetingUsers(args);
        },
        async createMeetingUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.createMeetingUser(args);
        },
        async batchCreateMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreateMeetingUsers(args);
        },
        async updateMeetingUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateMeetingUser(args);
        },
        async batchUpdateMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdateMeetingUsers(args);
        },
        async removeMeetingUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.removeMeetingUser(args);
        },
        async batchRemoveMeetingUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemoveMeetingUsers(args);
        },
        async createRelatedOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.createRelatedOrgs(args);
        },
        async updateRelatedOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateRelatedOrgs(args);
        },
        async createOrg(_, args, { dataSources }) {
            return await dataSources.defaultApi.createOrg(args);
        },
        async batchCreateOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreateOrgs(args);
        },
        async updateOrg(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateOrg(args);
        },
        async batchUpdateOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdateOrgs(args);
        },
        async removeOrg(_, args, { dataSources }) {
            return await dataSources.defaultApi.removeOrg(args);
        },
        async batchRemoveOrgs(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemoveOrgs(args);
        },
        async createRelatedUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.createRelatedUsers(args);
        },
        async updateRelatedUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateRelatedUsers(args);
        },
        async createUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.createUser(args);
        },
        async batchCreateUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchCreateUsers(args);
        },
        async updateUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.updateUser(args);
        },
        async batchUpdateUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchUpdateUsers(args);
        },
        async removeUser(_, args, { dataSources }) {
            return await dataSources.defaultApi.removeUser(args);
        },
        async batchRemoveUsers(_, args, { dataSources }) {
            return await dataSources.defaultApi.batchRemoveUsers(args);
        }
    },
    Meetingroom: {
        async meetings(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getMeetingsOfMeetingroom({ ...args, meetingroom: entity });
        }
    },
    Meeting: {
        async meetingroom(entity, args, { dataSources }) {
            return await dataSources.defaultApi.findMeetingroomByMeeting({ ...args, meeting: entity });
        },
        async meetingUsers(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getMeetingUsersOfMeeting({ ...args, meeting: entity });
        },
        async relatedUsers(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getRelatedUsersOfMeeting({ ...args, meeting: entity });
        }
    },
    MeetingUser: {
        async meeting(entity, args, { dataSources }) {
            return await dataSources.defaultApi.findMeetingByMeetingUser({ ...args, meetingUser: entity });
        },
        async user(entity, args, { dataSources }) {
            return await dataSources.defaultApi.findUserByMeetingUser({ ...args, meetingUser: entity });
        }
    },
    Org: {
        async parentOrg(entity, args, { dataSources }) {
            return await dataSources.defaultApi.findParentOrgByOrg({ ...args, org: entity });
        },
        async subOrgs(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getSubOrgsOfOrg({ ...args, org: entity });
        },
        async users(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getUsersOfOrg({ ...args, org: entity });
        }
    },
    User: {
        async org(entity, args, { dataSources }) {
            return await dataSources.defaultApi.findOrgByUser({ ...args, user: entity });
        },
        async meetingUsers(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getMeetingUsersOfUser({ ...args, user: entity });
        },
        async relatedMeetings(entity, args, { dataSources }) {
            return await dataSources.defaultApi.getRelatedMeetingsOfUser({ ...args, user: entity });
        }
    },
    Date: DateType,
    Upload: GraphQLUpload
};
