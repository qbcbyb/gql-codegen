module.exports = {
    __relationships: {
        meeting: {
            meetingroom_id: 'meetingroom'
        },
        meeting_user: {
            meeting_id: 'meeting',
            user_id: 'user'
        },
        org: {
            parentorg_id: ['org', 'subOrgs']
        },
        user: {
            org_id: 'org'
        }
    },
    dbFilePath: 'examples/data2.db'
};
