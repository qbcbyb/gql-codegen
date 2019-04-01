const path = require('path');
const sqlite = require('sqlite');
const { ApolloError } = require('apollo-server-errors');

const uploadHandler = () => {
    //add file upload handler
};

const entityFieldMap = {
    meetingroom: {
        id: 'id',
        roomName: 'room_name',
        area: 'area',
        capacity: 'capacity',
        roomAddress: 'room_address',
        facility: 'facility',
        photos: 'photos',
        status: 'status'
    },
    meeting: {
        id: 'id',
        meetingTitle: 'meeting_title',
        meetingTime: 'meeting_time',
        meetingType: 'meeting_type',
        meetingroomId: 'meetingroom_id',
        organizer: 'organizer',
        sponsor: 'sponsor',
        meetingContent: 'meeting_content',
        notifi: 'notifi',
        warn: 'warn',
        meetingStatus: 'meeting_status',
        attachment: 'attachment',
        attachments: 'attachments'
    },
    meeting_user: { id: 'id', meetingId: 'meeting_id', userId: 'user_id' },
    org: { id: 'id', orgName: 'org_name', parentorgId: 'parentorg_id' },
    user: { id: 'id', name: 'name', orgId: 'org_id' }
};

module.exports = class {
    constructor() {
        this.dbPromise = sqlite.open(path.resolve(__dirname, '../../../data2.db'));
    }

    // return like ['a=? and b=?',['a','b']]
    generateWhereCauseFromFilter(filter, fieldMap) {
        const wheres = [];
        let params = null;
        if (filter.ids) {
            params = [];
            wheres.push(
                `id in ( ${filter.ids
                    .map((id) => {
                        params.push(id);
                        return '?';
                    })
                    .join(' , ')} )`
            );
        } else {
            params = {};
            Object.keys(filter)
                .filter((key) => key !== 'q')
                .forEach((key) => {
                    if (key.indexOf('_lte') !== -1) {
                        const realKey = fieldMap[key.replace(/(_lte)$/, '')];
                        const valueKey = `$${key}`;
                        wheres.push(`${realKey} <= ${valueKey}`);
                        params[valueKey] = filter[key];
                        return;
                    }
                    if (key.indexOf('_gte') !== -1) {
                        const realKey = fieldMap[key.replace(/(_gte)$/, '')];
                        const valueKey = `$${key}`;
                        wheres.push(`${realKey} >= ${valueKey}`);
                        params[valueKey] = filter[key];
                        return;
                    }
                    if (key.indexOf('_lt') !== -1) {
                        const realKey = fieldMap[key.replace(/(_lt)$/, '')];
                        const valueKey = `$${key}`;
                        wheres.push(`${realKey} < ${valueKey}`);
                        params[valueKey] = filter[key];
                        return;
                    }
                    if (key.indexOf('_gt') !== -1) {
                        const realKey = fieldMap[key.replace(/(_gt)$/, '')];
                        const valueKey = `$${key}`;
                        wheres.push(`${realKey} > ${valueKey}`);
                        params[valueKey] = filter[key];
                        return;
                    }
                    const valueKey = `$${key}`;
                    wheres.push(`${fieldMap[key]} = ${valueKey}`);
                    params[valueKey] = filter[key];
                });

            if (filter.q) {
                const likes = [];
                const valueKey = `$q`;
                Object.keys(fieldMap).forEach((fieldName) => {
                    likes.push(`${fieldMap[fieldName]} like ${valueKey}`);
                });
                if (likes.length) {
                    wheres.push(`( ${likes.join(' or ')} )`);
                }
                params[valueKey] = `%${filter.q}%`;
            }
        }
        return [wheres.join(' and '), params];
    }

    selectPage(requestInfo) {
        const requestFields = requestInfo.fieldNodes[0].selectionSet.selections;
        const fields = requestFields
            .find((f) => f.name.value == 'list')
            .selectionSet.selections.map((f) => f.name.value);
        return fields;
    }
    selectNonPage(requestInfo) {
        const requestFields = requestInfo.fieldNodes[0].selectionSet.selections || [];
        const fields = requestFields.map((f) => f.name.value);
        return fields;
    }
    async insertInto(tableName, entity) {
        const db = await this.dbPromise;

        const fieldMap = entityFieldMap[tableName];

        const args = Object.keys(entity);
        const values = [],
            params = [];
        const fieldStr = Object.keys(fieldMap)
            .reduce((selectFields, fieldNameOfEntity) => {
                if (args.some((f) => f == fieldNameOfEntity)) {
                    selectFields.push(`${fieldMap[fieldNameOfEntity]}`);
                    values.push('?');
                    params.push(entity[fieldNameOfEntity]);
                }
                return selectFields;
            }, [])
            .join(',');
        const sql = `insert into ${tableName} (${fieldStr}) values (${values.join(',')})`;
        const result = await db.run(sql, params);
        return result.lastID;
    }
    async update(tableName, entity) {
        const id = entity.id;
        if (!id) {
            throw new ApolloError(`Can not find entity id: '${id}' from arguments!`);
        }

        const db = await this.dbPromise;

        const fieldMap = entityFieldMap[tableName];

        const args = Object.keys(entity);
        const params = [];
        const fieldEqualsValueStr = Object.keys(fieldMap)
            .reduce((fieldEqualsValues, fieldNameOfEntity) => {
                if (args.some((f) => f == fieldNameOfEntity)) {
                    fieldEqualsValues.push(`${fieldMap[fieldNameOfEntity]} = ?`);
                    params.push(entity[fieldNameOfEntity]);
                }
                return fieldEqualsValues;
            }, [])
            .join(',');
        const whereCause = `id=?`;
        params.push(id);
        const sql = `update ${tableName} set (${fieldEqualsValueStr}) where ${whereCause}`;
        const result = await db.run(sql, params);
        return result.changes > 0;
    }
    async deleteFrom(tableName, id) {
        if (!id) {
            throw new ApolloError(`Can not find entity id: '${id}' from arguments!`);
        }
        const db = await this.dbPromise;
        const params = [];
        const whereCause = `id=?`;
        params.push(id);
        const sql = `delete from ${tableName} where ${whereCause}`;
        const result = await db.run(sql, params);
        return result.changes > 0;
    }
    async filter(tableName, { sortField, sortOrder, page = 1, perPage, filter }, fields) {
        const db = await this.dbPromise;

        const fieldMap = entityFieldMap[tableName];

        const selectFieldStr = Object.keys(fieldMap)
            .reduce((selectFields, fieldNameOfEntity) => {
                if (fields.some((f) => f == fieldNameOfEntity)) {
                    selectFields.push(`${fieldMap[fieldNameOfEntity]} as ${fieldNameOfEntity}`);
                }
                return selectFields;
            }, [])
            .join(',');

        const query = ['from', tableName];

        const [whereCause, params] = this.generateWhereCauseFromFilter(filter, fieldMap);
        query.push(whereCause ? `where ${whereCause}` : '');

        if (sortField) {
            query.push('order by');
            query.push(sortField);
            query.push(sortOrder || '');
        }

        if (page && perPage) {
            query.push('limit');
            query.push(perPage);
            query.push('offset');
            query.push((page - 1) * perPage);
            const [items, { total }] = await Promise.all([
                db.all([`select ${selectFieldStr}`, ...query].join(' '), params),
                db.get(['select count(*) as total', ...query].join(' '), params)
            ]);
            return {
                list: items,
                total,
                pages: perPage ? Math.ceil(total / perPage) : -1
            };
        } else {
            const items = await db.all([`select ${selectFieldStr}`, ...query].join(' '), params);
            return {
                list: items
            };
        }
    }

    //----------------start of Meetingroom
    async allMeetingrooms({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('meetingroom', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPaginationMeetingrooms({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter(
            'meetingroom',
            { sortField, sortOrder, page: null, perPage: null, filter },
            this.selectNonPage(info)
        )).list;
    }
    async meetingroom({ id }, info) {
        return (await this.filter('meetingroom', { filter: { id } }, this.selectNonPage(info))).list[0];
    }
    async createMeetingroom(entity, info) {
        return await this.insertInto('meetingroom', entity);
    }
    async batchCreateMeetingrooms({ meetingrooms: entitys }, info) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.createMeetingroom(entity).then((entity_id) => {
                            created.push(entity_id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return created;
            } catch (e) {
                Object.assign(e.extensions, { created });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async updateMeetingroom(entity, info) {
        return await this.update('meetingroom', entity);
    }
    async batchUpdateMeetingrooms({ meetingrooms: entitys }, info) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.updateMeetingroom(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.createMeetingroom(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              })
                    );
                });
                await Promise.all(allPromise);
                return updated;
            } catch (e) {
                Object.assign(e.extensions, { updated });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async removeMeetingroom({ id }, info) {
        return await this.deleteFrom('meetingroom', id);
    }
    async batchRemoveMeetingrooms({ meetingroomIds: ids }, info) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.removeMeetingroom({ id }).then(() => {
                            removed.push(id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return removed;
            } catch (e) {
                e.extensions = Object.assign({}, e.extensions, { removed });
                throw e;
            }
        }
        throw new ApolloError(`Can not find meetingroomIds!`);
    }
    async getMeetingsOfMeetingroom({ meetingroom }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'meeting',
            { sortField, sortOrder, page: null, perPage: null, filter: { meetingroom_id: meetingroom.id } },
            [...fields, 'id']
        )).list;
        return result;
    }
    //----------------end of Meetingroom

    //----------------start of Meeting
    async allMeetings({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('meeting', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPaginationMeetings({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter(
            'meeting',
            { sortField, sortOrder, page: null, perPage: null, filter },
            this.selectNonPage(info)
        )).list;
    }
    async meeting({ id }, info) {
        return (await this.filter('meeting', { filter: { id } }, this.selectNonPage(info))).list[0];
    }
    async createRelatedMeetings(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (!entity.meetingroomId && entity.meetingroom) {
            if (entity.meetingroom.id) {
                entity.meetingroomId = entity.meetingroom.id;
            } else {
                const meetingroomId = await this.createMeetingroom(entity.meetingroom);
                entity.meetingroomId = meetingroomId;
            }
            delete entity.meetingroom;
        }

        if (!manyFields.length) {
            const result_id = await this.createMeeting(entity);
            return [result_id];
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createMeeting(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async updateRelatedMeetings(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (entity.meetingroomId || entity.meetingroom) {
            if (entity.meetingroom) {
                entity.meetingroomId = entity.meetingroom.id;
                const meetingroom_updated = await this.updateMeetingroom(entity.meetingroom);
                delete entity.meetingroom;
            }

            if (!entity.meetingroomId) {
                throw new ApolloError(`There is no meetingroom's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const meetingIds = (await this.filter('meeting', { filter: entity }, ['id'])).list.map((i) => i.id);

            await this.batchRemoveMeetings({ meetingIds });

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createMeeting(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async createMeeting(entity, info) {
        if (entity['attachment']) {
            entity['attachment'] = await uploadHandler(entity['attachment']);
        }
        if (entity['attachments']) {
            entity['attachments'] = await uploadHandler(entity['attachments']);
        }

        return await this.insertInto('meeting', entity);
    }
    async batchCreateMeetings({ meetings: entitys }, info) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.createMeeting(entity).then((entity_id) => {
                            created.push(entity_id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return created;
            } catch (e) {
                Object.assign(e.extensions, { created });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async updateMeeting(entity, info) {
        if (entity['attachment']) {
            entity['attachment'] = await uploadHandler(entity['attachment']);
        }
        if (entity['attachments']) {
            entity['attachments'] = await uploadHandler(entity['attachments']);
        }

        return await this.update('meeting', entity);
    }
    async batchUpdateMeetings({ meetings: entitys }, info) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.updateMeeting(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.createMeeting(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              })
                    );
                });
                await Promise.all(allPromise);
                return updated;
            } catch (e) {
                Object.assign(e.extensions, { updated });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async removeMeeting({ id }, info) {
        return await this.deleteFrom('meeting', id);
    }
    async batchRemoveMeetings({ meetingIds: ids }, info) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.removeMeeting({ id }).then(() => {
                            removed.push(id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return removed;
            } catch (e) {
                e.extensions = Object.assign({}, e.extensions, { removed });
                throw e;
            }
        }
        throw new ApolloError(`Can not find meetingIds!`);
    }
    async findMeetingroomByMeeting({ meeting }, info) {
        return (await this.filter(
            'meetingroom',
            { sortField, sortOrder, page: null, perPage: null, filter: { id: meeting['meetingroomId'] } },
            this.selectNonPage(info)
        )).list[0];
    }
    async getMeetingUsersOfMeeting({ meeting }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'meeting_user',
            { sortField, sortOrder, page: null, perPage: null, filter: { meeting_id: meeting.id } },
            [...fields, 'id']
        )).list;
        return result;
    }
    async getRelatedUsersOfMeeting({ meeting }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'meeting_user',
            { sortField, sortOrder, page: null, perPage: null, filter: { meeting_id: meeting.id } },
            [...fields, 'id']
        )).list;
        result = (await this.filter('user', { ids: result.map((r) => r.user_id) }, fields)).list;
        return result;
    }
    //----------------end of Meeting

    //----------------start of MeetingUser
    async allMeetingUsers({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('meeting_user', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPaginationMeetingUsers({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter(
            'meeting_user',
            { sortField, sortOrder, page: null, perPage: null, filter },
            this.selectNonPage(info)
        )).list;
    }
    async meetingUser({ id }, info) {
        return (await this.filter('meeting_user', { filter: { id } }, this.selectNonPage(info))).list[0];
    }
    async createRelatedMeetingUsers(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [
            { key: 'meeting_id', name: 'meetingIds', type: '[Int]' },
            { key: 'user_id', name: 'userIds', type: '[Int]' }
        ];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (!entity.meetingId && entity.meeting) {
            if (entity.meeting.id) {
                entity.meetingId = entity.meeting.id;
            } else {
                const meetingId = await this.createMeeting(entity.meeting);
                entity.meetingId = meetingId;
            }
            delete entity.meeting;
        }
        if (!entity.userId && entity.user) {
            if (entity.user.id) {
                entity.userId = entity.user.id;
            } else {
                const userId = await this.createUser(entity.user);
                entity.userId = userId;
            }
            delete entity.user;
        }

        if (!manyFields.length) {
            const result_id = await this.createMeetingUser(entity);
            return [result_id];
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createMeetingUser(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async updateRelatedMeetingUsers(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [
            { key: 'meeting_id', name: 'meetingIds', type: '[Int]' },
            { key: 'user_id', name: 'userIds', type: '[Int]' }
        ];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (entity.meetingId || entity.meeting) {
            if (entity.meeting) {
                entity.meetingId = entity.meeting.id;
                const meeting_updated = await this.updateMeeting(entity.meeting);
                delete entity.meeting;
            }

            if (!entity.meetingId) {
                throw new ApolloError(`There is no meeting's id in arguments!`, 500);
            }
        }
        if (entity.userId || entity.user) {
            if (entity.user) {
                entity.userId = entity.user.id;
                const user_updated = await this.updateUser(entity.user);
                delete entity.user;
            }

            if (!entity.userId) {
                throw new ApolloError(`There is no user's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const meetingUserIds = (await this.filter('meeting_user', { filter: entity }, ['id'])).list.map(
                (i) => i.id
            );

            await this.batchRemoveMeetingUsers({ meetingUserIds });

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createMeetingUser(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async createMeetingUser(entity, info) {
        return await this.insertInto('meeting_user', entity);
    }
    async batchCreateMeetingUsers({ meetingUsers: entitys }, info) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.createMeetingUser(entity).then((entity_id) => {
                            created.push(entity_id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return created;
            } catch (e) {
                Object.assign(e.extensions, { created });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async updateMeetingUser(entity, info) {
        return await this.update('meeting_user', entity);
    }
    async batchUpdateMeetingUsers({ meetingUsers: entitys }, info) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.updateMeetingUser(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.createMeetingUser(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              })
                    );
                });
                await Promise.all(allPromise);
                return updated;
            } catch (e) {
                Object.assign(e.extensions, { updated });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async removeMeetingUser({ id }, info) {
        return await this.deleteFrom('meeting_user', id);
    }
    async batchRemoveMeetingUsers({ meetingUserIds: ids }, info) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.removeMeetingUser({ id }).then(() => {
                            removed.push(id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return removed;
            } catch (e) {
                e.extensions = Object.assign({}, e.extensions, { removed });
                throw e;
            }
        }
        throw new ApolloError(`Can not find meetingUserIds!`);
    }
    async findMeetingByMeetingUser({ meetingUser }, info) {
        return (await this.filter(
            'meeting',
            { sortField, sortOrder, page: null, perPage: null, filter: { id: meetingUser['meetingId'] } },
            this.selectNonPage(info)
        )).list[0];
    }
    async findUserByMeetingUser({ meetingUser }, info) {
        return (await this.filter(
            'user',
            { sortField, sortOrder, page: null, perPage: null, filter: { id: meetingUser['userId'] } },
            this.selectNonPage(info)
        )).list[0];
    }
    //----------------end of MeetingUser

    //----------------start of Org
    async allOrgs({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('org', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPaginationOrgs({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter(
            'org',
            { sortField, sortOrder, page: null, perPage: null, filter },
            this.selectNonPage(info)
        )).list;
    }
    async org({ id }, info) {
        return (await this.filter('org', { filter: { id } }, this.selectNonPage(info))).list[0];
    }
    async createRelatedOrgs(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (!entity.parentorgId && entity.parentorg) {
            if (entity.parentorg.id) {
                entity.parentorgId = entity.parentorg.id;
            } else {
                const parentorgId = await this.createOrg(entity.parentorg);
                entity.parentorgId = parentorgId;
            }
            delete entity.parentorg;
        }

        if (!manyFields.length) {
            const result_id = await this.createOrg(entity);
            return [result_id];
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createOrg(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async updateRelatedOrgs(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (entity.parentorgId || entity.parentorg) {
            if (entity.parentorg) {
                entity.parentorgId = entity.parentorg.id;
                const parentorg_updated = await this.updateOrg(entity.parentorg);
                delete entity.parentorg;
            }

            if (!entity.parentorgId) {
                throw new ApolloError(`There is no parentorg's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const orgIds = (await this.filter('org', { filter: entity }, ['id'])).list.map((i) => i.id);

            await this.batchRemoveOrgs({ orgIds });

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createOrg(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async createOrg(entity, info) {
        return await this.insertInto('org', entity);
    }
    async batchCreateOrgs({ orgs: entitys }, info) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.createOrg(entity).then((entity_id) => {
                            created.push(entity_id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return created;
            } catch (e) {
                Object.assign(e.extensions, { created });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async updateOrg(entity, info) {
        return await this.update('org', entity);
    }
    async batchUpdateOrgs({ orgs: entitys }, info) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.updateOrg(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.createOrg(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              })
                    );
                });
                await Promise.all(allPromise);
                return updated;
            } catch (e) {
                Object.assign(e.extensions, { updated });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async removeOrg({ id }, info) {
        return await this.deleteFrom('org', id);
    }
    async batchRemoveOrgs({ orgIds: ids }, info) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.removeOrg({ id }).then(() => {
                            removed.push(id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return removed;
            } catch (e) {
                e.extensions = Object.assign({}, e.extensions, { removed });
                throw e;
            }
        }
        throw new ApolloError(`Can not find orgIds!`);
    }
    async findParentorgByOrg({ org }, info) {
        return (await this.filter(
            'org',
            { sortField, sortOrder, page: null, perPage: null, filter: { id: org['parentorgId'] } },
            this.selectNonPage(info)
        )).list[0];
    }
    async getSubOrgsOfOrg({ org }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'org',
            { sortField, sortOrder, page: null, perPage: null, filter: { parentorg_id: org.id } },
            [...fields, 'id']
        )).list;
        return result;
    }
    async getUsersOfOrg({ org }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'user',
            { sortField, sortOrder, page: null, perPage: null, filter: { org_id: org.id } },
            [...fields, 'id']
        )).list;
        return result;
    }
    //----------------end of Org

    //----------------start of User
    async allUsers({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('user', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPaginationUsers({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter(
            'user',
            { sortField, sortOrder, page: null, perPage: null, filter },
            this.selectNonPage(info)
        )).list;
    }
    async user({ id }, info) {
        return (await this.filter('user', { filter: { id } }, this.selectNonPage(info))).list[0];
    }
    async createRelatedUsers(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (!entity.orgId && entity.org) {
            if (entity.org.id) {
                entity.orgId = entity.org.id;
            } else {
                const orgId = await this.createOrg(entity.org);
                entity.orgId = orgId;
            }
            delete entity.org;
        }

        if (!manyFields.length) {
            const result_id = await this.createUser(entity);
            return [result_id];
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createUser(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async updateRelatedUsers(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (entity.orgId || entity.org) {
            if (entity.org) {
                entity.orgId = entity.org.id;
                const org_updated = await this.updateOrg(entity.org);
                delete entity.org;
            }

            if (!entity.orgId) {
                throw new ApolloError(`There is no org's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const userIds = (await this.filter('user', { filter: entity }, ['id'])).list.map((i) => i.id);

            await this.batchRemoveUsers({ userIds });

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.createUser(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return await Promise.all(promiseArr);
        }
    }
    async createUser(entity, info) {
        return await this.insertInto('user', entity);
    }
    async batchCreateUsers({ users: entitys }, info) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.createUser(entity).then((entity_id) => {
                            created.push(entity_id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return created;
            } catch (e) {
                Object.assign(e.extensions, { created });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async updateUser(entity, info) {
        return await this.update('user', entity);
    }
    async batchUpdateUsers({ users: entitys }, info) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.updateUser(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.createUser(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              })
                    );
                });
                await Promise.all(allPromise);
                return updated;
            } catch (e) {
                Object.assign(e.extensions, { updated });
                throw e;
            }
        }
        throw new ApolloError(`Can not find entitys!`);
    }
    async removeUser({ id }, info) {
        return await this.deleteFrom('user', id);
    }
    async batchRemoveUsers({ userIds: ids }, info) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.removeUser({ id }).then(() => {
                            removed.push(id);
                        })
                    );
                });
                await Promise.all(allPromise);
                return removed;
            } catch (e) {
                e.extensions = Object.assign({}, e.extensions, { removed });
                throw e;
            }
        }
        throw new ApolloError(`Can not find userIds!`);
    }
    async findOrgByUser({ user }, info) {
        return (await this.filter(
            'org',
            { sortField, sortOrder, page: null, perPage: null, filter: { id: user['orgId'] } },
            this.selectNonPage(info)
        )).list[0];
    }
    async getMeetingUsersOfUser({ user }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'meeting_user',
            { sortField, sortOrder, page: null, perPage: null, filter: { user_id: user.id } },
            [...fields, 'id']
        )).list;
        return result;
    }
    async getRelatedMeetingsOfUser({ user }, info) {
        const fields = this.selectNonPage(info);
        let result = (await this.filter(
            'meeting_user',
            { sortField, sortOrder, page: null, perPage: null, filter: { user_id: user.id } },
            [...fields, 'id']
        )).list;
        result = (await this.filter('meeting', { ids: result.map((r) => r.meeting_id) }, fields)).list;
        return result;
    }
    //----------------end of User
};
