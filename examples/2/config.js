module.exports = {
    files: {
        meetingroom: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {
                id: {},
                room_name: {},
                area: {},
                capacity: {},
                room_address: {},
                facility: {},
                photos: {},
                status: {},
                meetings: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                }
            }
        },
        allMeetingrooms: {
            noNeed: false,
            exclude: [],
            include: ['page', 'perPage', 'sortField', 'sortOrder', 'filter'],
            fields: {
                list: {
                    id: {},
                    room_name: {},
                    area: {},
                    capacity: {},
                    room_address: {},
                    facility: {},
                    photos: {},
                    status: {},
                    meetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                },
                total: {},
                pages: {}
            }
        },
        nonPaginationMeetingrooms: {
            noNeed: true,
            exclude: [],
            include: ['sortField', 'sortOrder', 'filter'],
            fields: {
                id: {},
                room_name: {},
                area: {},
                capacity: {},
                room_address: {},
                facility: {},
                photos: {},
                status: {},
                meetings: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                }
            }
        },
        meeting: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {
                id: {},
                meeting_title: {},
                meeting_time: {},
                meeting_type: {},
                meetingroom_id: {},
                organizer: {},
                sponsor: {},
                meeting_content: {},
                notifi: {},
                warn: {},
                meeting_status: {},
                attachment: {
                    id: {},
                    fileName: {},
                    fullPath: {},
                    thumbnail: {},
                    mimetype: {}
                },
                attachments: {
                    id: {},
                    fileName: {},
                    fullPath: {},
                    thumbnail: {},
                    mimetype: {}
                },
                meetingroom: {
                    id: {},
                    room_name: {},
                    area: {},
                    capacity: {},
                    room_address: {},
                    facility: {},
                    photos: {},
                    status: {},
                    meetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                },
                meetingUsers: {
                    id: {},
                    meeting_id: {},
                    user_id: {},
                    meeting: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    user: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                relatedUsers: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        allMeetings: {
            noNeed: false,
            exclude: [],
            include: ['page', 'perPage', 'sortField', 'sortOrder', 'filter'],
            fields: {
                list: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                total: {},
                pages: {}
            }
        },
        nonPaginationMeetings: {
            noNeed: true,
            exclude: [],
            include: ['sortField', 'sortOrder', 'filter'],
            fields: {
                id: {},
                meeting_title: {},
                meeting_time: {},
                meeting_type: {},
                meetingroom_id: {},
                organizer: {},
                sponsor: {},
                meeting_content: {},
                notifi: {},
                warn: {},
                meeting_status: {},
                attachment: {
                    id: {},
                    fileName: {},
                    fullPath: {},
                    thumbnail: {},
                    mimetype: {}
                },
                attachments: {
                    id: {},
                    fileName: {},
                    fullPath: {},
                    thumbnail: {},
                    mimetype: {}
                },
                meetingroom: {
                    id: {},
                    room_name: {},
                    area: {},
                    capacity: {},
                    room_address: {},
                    facility: {},
                    photos: {},
                    status: {},
                    meetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                },
                meetingUsers: {
                    id: {},
                    meeting_id: {},
                    user_id: {},
                    meeting: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    user: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                relatedUsers: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        meetingUser: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {
                id: {},
                meeting_id: {},
                user_id: {},
                meeting: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                user: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        allMeetingUsers: {
            noNeed: false,
            exclude: [],
            include: ['page', 'perPage', 'sortField', 'sortOrder', 'filter'],
            fields: {
                list: {
                    id: {},
                    meeting_id: {},
                    user_id: {},
                    meeting: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    user: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                total: {},
                pages: {}
            }
        },
        nonPaginationMeetingUsers: {
            noNeed: true,
            exclude: [],
            include: ['sortField', 'sortOrder', 'filter'],
            fields: {
                id: {},
                meeting_id: {},
                user_id: {},
                meeting: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                user: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        org: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {
                id: {},
                org_name: {},
                parentOrg_id: {},
                parentOrg: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                subOrgs: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                users: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        allOrgs: {
            noNeed: false,
            exclude: [],
            include: ['page', 'perPage', 'sortField', 'sortOrder', 'filter'],
            fields: {
                list: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                total: {},
                pages: {}
            }
        },
        nonPaginationOrgs: {
            noNeed: true,
            exclude: [],
            include: ['sortField', 'sortOrder', 'filter'],
            fields: {
                id: {},
                org_name: {},
                parentOrg_id: {},
                parentOrg: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                subOrgs: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                users: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                }
            }
        },
        user: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {
                id: {},
                name: {},
                org_id: {},
                meetingUsers: {
                    id: {},
                    meeting_id: {},
                    user_id: {},
                    meeting: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    user: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                relatedMeetings: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                org: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                }
            }
        },
        allUsers: {
            noNeed: false,
            exclude: [],
            include: ['page', 'perPage', 'sortField', 'sortOrder', 'filter'],
            fields: {
                list: {
                    id: {},
                    name: {},
                    org_id: {},
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedMeetings: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    org: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    }
                },
                total: {},
                pages: {}
            }
        },
        nonPaginationUsers: {
            noNeed: true,
            exclude: [],
            include: ['sortField', 'sortOrder', 'filter'],
            fields: {
                id: {},
                name: {},
                org_id: {},
                meetingUsers: {
                    id: {},
                    meeting_id: {},
                    user_id: {},
                    meeting: {
                        id: {},
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {},
                        meetingroom_id: {},
                        organizer: {},
                        sponsor: {},
                        meeting_content: {},
                        notifi: {},
                        warn: {},
                        meeting_status: {},
                        attachment: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        attachments: {
                            id: {},
                            fileName: {},
                            fullPath: {},
                            thumbnail: {},
                            mimetype: {}
                        },
                        meetingroom: {
                            id: {},
                            room_name: {},
                            area: {},
                            capacity: {},
                            room_address: {},
                            facility: {},
                            photos: {},
                            status: {},
                            meetings: {}
                        },
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedUsers: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    user: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                relatedMeetings: {
                    id: {},
                    meeting_title: {},
                    meeting_time: {},
                    meeting_type: {},
                    meetingroom_id: {},
                    organizer: {},
                    sponsor: {},
                    meeting_content: {},
                    notifi: {},
                    warn: {},
                    meeting_status: {},
                    attachment: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    attachments: {
                        id: {},
                        fileName: {},
                        fullPath: {},
                        thumbnail: {},
                        mimetype: {}
                    },
                    meetingroom: {
                        id: {},
                        room_name: {},
                        area: {},
                        capacity: {},
                        room_address: {},
                        facility: {},
                        photos: {},
                        status: {},
                        meetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        }
                    },
                    meetingUsers: {
                        id: {},
                        meeting_id: {},
                        user_id: {},
                        meeting: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        user: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    relatedUsers: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                },
                org: {
                    id: {},
                    org_name: {},
                    parentOrg_id: {},
                    parentOrg: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    subOrgs: {
                        id: {},
                        org_name: {},
                        parentOrg_id: {},
                        parentOrg: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        subOrgs: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        },
                        users: {
                            id: {},
                            name: {},
                            org_id: {},
                            meetingUsers: {},
                            relatedMeetings: {},
                            org: {}
                        }
                    },
                    users: {
                        id: {},
                        name: {},
                        org_id: {},
                        meetingUsers: {
                            id: {},
                            meeting_id: {},
                            user_id: {},
                            meeting: {},
                            user: {}
                        },
                        relatedMeetings: {
                            id: {},
                            meeting_title: {},
                            meeting_time: {},
                            meeting_type: {},
                            meetingroom_id: {},
                            organizer: {},
                            sponsor: {},
                            meeting_content: {},
                            notifi: {},
                            warn: {},
                            meeting_status: {},
                            attachment: {},
                            attachments: {},
                            meetingroom: {},
                            meetingUsers: {},
                            relatedUsers: {}
                        },
                        org: {
                            id: {},
                            org_name: {},
                            parentOrg_id: {},
                            parentOrg: {},
                            subOrgs: {},
                            users: {}
                        }
                    }
                }
            }
        },
        createMeetingroom: {
            noNeed: false,
            exclude: [],
            include: ['id', 'room_name', 'area', 'capacity', 'room_address', 'facility', 'photos', 'status'],
            fields: {}
        },
        batchCreateMeetingrooms: {
            noNeed: true,
            exclude: [],
            include: ['meetingrooms'],
            fields: {}
        },
        updateMeetingroom: {
            noNeed: false,
            exclude: [],
            include: ['id', 'room_name', 'area', 'capacity', 'room_address', 'facility', 'photos', 'status'],
            fields: {}
        },
        batchUpdateMeetingrooms: {
            noNeed: true,
            exclude: [],
            include: ['meetingrooms'],
            fields: {}
        },
        removeMeetingroom: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {}
        },
        batchRemoveMeetingrooms: {
            noNeed: true,
            exclude: [],
            include: ['meetingroomIds'],
            fields: {}
        },
        createRelatedMeetings: {
            noNeed: false,
            exclude: [],
            include: [
                'id',
                'meeting_title',
                'meeting_time',
                'meeting_type',
                'meetingroom_id',
                'organizer',
                'sponsor',
                'meeting_content',
                'notifi',
                'warn',
                'meeting_status',
                'attachment',
                'attachments',
                'meetingroom'
            ],
            fields: {}
        },
        updateRelatedMeetings: {
            noNeed: false,
            exclude: [],
            include: [
                'id',
                'meeting_title',
                'meeting_time',
                'meeting_type',
                'meetingroom_id',
                'organizer',
                'sponsor',
                'meeting_content',
                'notifi',
                'warn',
                'meeting_status',
                'attachment',
                'attachments',
                'meetingroom'
            ],
            fields: {}
        },
        createMeeting: {
            noNeed: false,
            exclude: [],
            include: [
                'id',
                'meeting_title',
                'meeting_time',
                'meeting_type',
                'meetingroom_id',
                'organizer',
                'sponsor',
                'meeting_content',
                'notifi',
                'warn',
                'meeting_status',
                'attachment',
                'attachments'
            ],
            fields: {}
        },
        batchCreateMeetings: {
            noNeed: true,
            exclude: [],
            include: ['meetings'],
            fields: {}
        },
        updateMeeting: {
            noNeed: false,
            exclude: [],
            include: [
                'id',
                'meeting_title',
                'meeting_time',
                'meeting_type',
                'meetingroom_id',
                'organizer',
                'sponsor',
                'meeting_content',
                'notifi',
                'warn',
                'meeting_status',
                'attachment',
                'attachments'
            ],
            fields: {}
        },
        batchUpdateMeetings: {
            noNeed: true,
            exclude: [],
            include: ['meetings'],
            fields: {}
        },
        removeMeeting: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {}
        },
        batchRemoveMeetings: {
            noNeed: true,
            exclude: [],
            include: ['meetingIds'],
            fields: {}
        },
        createRelatedMeetingUsers: {
            noNeed: false,
            exclude: [],
            include: ['id', 'meeting_id', 'user_id', 'meeting', 'user', 'meeting_ids', 'user_ids'],
            fields: {}
        },
        updateRelatedMeetingUsers: {
            noNeed: false,
            exclude: [],
            include: ['id', 'meeting_id', 'user_id', 'meeting', 'user', 'meeting_ids', 'user_ids'],
            fields: {}
        },
        createMeetingUser: {
            noNeed: false,
            exclude: [],
            include: ['id', 'meeting_id', 'user_id'],
            fields: {}
        },
        batchCreateMeetingUsers: {
            noNeed: true,
            exclude: [],
            include: ['meetingUsers'],
            fields: {}
        },
        updateMeetingUser: {
            noNeed: false,
            exclude: [],
            include: ['id', 'meeting_id', 'user_id'],
            fields: {}
        },
        batchUpdateMeetingUsers: {
            noNeed: true,
            exclude: [],
            include: ['meetingUsers'],
            fields: {}
        },
        removeMeetingUser: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {}
        },
        batchRemoveMeetingUsers: {
            noNeed: true,
            exclude: [],
            include: ['meetingUserIds'],
            fields: {}
        },
        createRelatedOrgs: {
            noNeed: false,
            exclude: [],
            include: ['id', 'org_name', 'parentOrg_id', 'parentOrg'],
            fields: {}
        },
        updateRelatedOrgs: {
            noNeed: false,
            exclude: [],
            include: ['id', 'org_name', 'parentOrg_id', 'parentOrg'],
            fields: {}
        },
        createOrg: {
            noNeed: false,
            exclude: [],
            include: ['id', 'org_name', 'parentOrg_id'],
            fields: {}
        },
        batchCreateOrgs: {
            noNeed: true,
            exclude: [],
            include: ['orgs'],
            fields: {}
        },
        updateOrg: {
            noNeed: false,
            exclude: [],
            include: ['id', 'org_name', 'parentOrg_id'],
            fields: {}
        },
        batchUpdateOrgs: {
            noNeed: true,
            exclude: [],
            include: ['orgs'],
            fields: {}
        },
        removeOrg: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {}
        },
        batchRemoveOrgs: {
            noNeed: true,
            exclude: [],
            include: ['orgIds'],
            fields: {}
        },
        createRelatedUsers: {
            noNeed: false,
            exclude: [],
            include: ['id', 'name', 'org_id', 'org'],
            fields: {}
        },
        updateRelatedUsers: {
            noNeed: false,
            exclude: [],
            include: ['id', 'name', 'org_id', 'org'],
            fields: {}
        },
        createUser: {
            noNeed: false,
            exclude: [],
            include: ['id', 'name', 'org_id'],
            fields: {}
        },
        batchCreateUsers: {
            noNeed: true,
            exclude: [],
            include: ['users'],
            fields: {}
        },
        updateUser: {
            noNeed: false,
            exclude: [],
            include: ['id', 'name', 'org_id'],
            fields: {}
        },
        batchUpdateUsers: {
            noNeed: true,
            exclude: [],
            include: ['users'],
            fields: {}
        },
        removeUser: {
            noNeed: false,
            exclude: [],
            include: ['id'],
            fields: {}
        },
        batchRemoveUsers: {
            noNeed: true,
            exclude: [],
            include: ['userIds'],
            fields: {}
        }
    },
    unions: {
        // "someKey": "anotherKey",
        // --------or
        // "allTrainings": [
        //     "allColumns",
        //     {
        //         "allColumns": { "exclude": ["filter"] },
        //         "allTests": {}
        //     },
        //     { "allColumns": { "include": ["page"] } },
        //     { "allColumns": { "include": [] } },
        //     {
        //         "allColumns": {
        //             "exclude": ["filter", "page"],
        //             "include": ["page", "perPage"]
        //         }
        //     },
        //     "training"
        // ]
        meetingroom: [
            {
                meeting: {
                    fields: {
                        meeting_title: {},
                        meeting_time: {},
                        meeting_type: {}
                    }
                }
            }
        ]
    }
};
