const { ApolloError } = require('apollo-server-errors');
const { applyFilters } = require('gql-codegen');

const uploadHandler = () => {
    //add file upload handler
};

const mockData = require('../../../data2.js');

Object.keys(mockData).forEach((k) => {
    if (k.startsWith('__')) {
        delete mockData[k];
    } else {
        mockData[k] = mockData[k].filter((i) => !i.id || i.id >= 0);
    }
});

module.exports = class {
    filter(items, { sortField, sortOrder, page = 1, perPage, filter }) {
        if (sortField) {
            const direction = sortOrder.toLowerCase() == 'asc' ? 1 : -1;
            items = items.sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return direction;
                }
                if (a[sortField] < b[sortField]) {
                    return -1 * direction;
                }
                return 0;
            });
        }

        items = applyFilters(items, filter);

        const total = items.length;

        if (page && perPage) {
            items = items.slice((page - 1) * perPage, (page - 1) * perPage + perPage);
        }

        return {
            list: items,
            total,
            pages: perPage ? Math.ceil(total / perPage) : -1
        };
    }

    //----------------start of Meetingroom
    async allMeetingrooms({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        let items = [...mockData['meetingrooms']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPaginationMeetingrooms({ sortField, sortOrder = 'asc', filter = {} }, info) {
        let items = [...mockData['meetingrooms']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async meetingroom({ id }, info) {
        return mockData['meetingrooms'].find((d) => d.id == id);
    }
    async createMeetingroom(entity, info) {
        const entityData = mockData['meetingrooms'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        entityData.push(newEntity);
        return newEntity.id;
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
    async updateMeetingroom(params, info) {
        const entityData = mockData['meetingrooms'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
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
        const entityData = mockData['meetingrooms'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);

        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
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
        let result = mockData['meetings'].filter((record) => record['meetingroom_id'] == meetingroom.id);
        return result;
    }
    //----------------end of Meetingroom

    //----------------start of Meeting
    async allMeetings({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        let items = [...mockData['meetings']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPaginationMeetings({ sortField, sortOrder = 'asc', filter = {} }, info) {
        let items = [...mockData['meetings']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async meeting({ id }, info) {
        return mockData['meetings'].find((d) => d.id == id);
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

        if (!entity.meetingroom_id && entity.meetingroom) {
            if (entity.meetingroom.id) {
                entity.meetingroom_id = entity.meetingroom.id;
            } else {
                const meetingroom_id = await this.createMeetingroom(entity.meetingroom);
                entity.meetingroom_id = meetingroom_id;
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

        if (entity.meetingroom_id || entity.meetingroom) {
            if (entity.meetingroom) {
                entity.meetingroom_id = entity.meetingroom.id;
                const meetingroom_updated = await this.updateMeetingroom(entity.meetingroom);
                delete entity.meetingroom;
            }

            if (!entity.meetingroom_id) {
                throw new ApolloError(`There is no meetingroom's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const meetingIds = applyFilters(mockData['meetings'], entity).map((i) => i.id);

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
        const entityData = mockData['meetings'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        if (entity['attachment']) {
            newEntity['attachment'] = await uploadHandler(entity['attachment']);
        }

        let uploads;
        if (entity['attachments'] && entity['attachments'].length) {
            uploads = [];
            entity['attachments'].forEach((file) => {
                uploads.push(uploadHandler(file));
            });
            newEntity['attachments'] = await Promise.all(uploads);
        }

        entityData.push(newEntity);
        return newEntity.id;
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
    async updateMeeting(params, info) {
        const entityData = mockData['meetings'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
            if (params['attachment']) {
                entity['attachment'] = await uploadHandler(params['attachment']);
            }
            let uploads;
            if (params['attachments'] && params['attachments'].length) {
                uploads = [];
                params['attachments'].forEach((file) => {
                    uploads.push(uploadHandler(file));
                });
                entity['attachments'] = await Promise.all(uploads);
            }
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
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
        const entityData = mockData['meetings'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);

        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
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
        return mockData['meetingrooms'].find((relatedRecord) => relatedRecord.id == meeting['meetingroom_id']);
    }
    async getMeetingUsersOfMeeting({ meeting }, info) {
        let result = mockData['meeting_users'].filter((record) => record['meeting_id'] == meeting.id);
        return result;
    }
    async getRelatedUsersOfMeeting({ meeting }, info) {
        let result = mockData['meeting_users'].filter((record) => record['meeting_id'] == meeting.id);
        result = applyFilters(mockData['users'], { ids: result.map((r) => r.user_id) });
        return result;
    }
    //----------------end of Meeting

    //----------------start of MeetingUser
    async allMeetingUsers({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        let items = [...mockData['meeting_users']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPaginationMeetingUsers({ sortField, sortOrder = 'asc', filter = {} }, info) {
        let items = [...mockData['meeting_users']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async meetingUser({ id }, info) {
        return mockData['meeting_users'].find((d) => d.id == id);
    }
    async createRelatedMeetingUsers(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = [
            { key: 'meeting_id', name: 'meeting_ids', type: '[ID]' },
            { key: 'user_id', name: 'user_ids', type: '[ID]' }
        ];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (!entity.meeting_id && entity.meeting) {
            if (entity.meeting.id) {
                entity.meeting_id = entity.meeting.id;
            } else {
                const meeting_id = await this.createMeeting(entity.meeting);
                entity.meeting_id = meeting_id;
            }
            delete entity.meeting;
        }
        if (!entity.user_id && entity.user) {
            if (entity.user.id) {
                entity.user_id = entity.user.id;
            } else {
                const user_id = await this.createUser(entity.user);
                entity.user_id = user_id;
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
            { key: 'meeting_id', name: 'meeting_ids', type: '[ID]' },
            { key: 'user_id', name: 'user_ids', type: '[ID]' }
        ];
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(
                `Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`,
                500
            );
        }

        if (entity.meeting_id || entity.meeting) {
            if (entity.meeting) {
                entity.meeting_id = entity.meeting.id;
                const meeting_updated = await this.updateMeeting(entity.meeting);
                delete entity.meeting;
            }

            if (!entity.meeting_id) {
                throw new ApolloError(`There is no meeting's id in arguments!`, 500);
            }
        }
        if (entity.user_id || entity.user) {
            if (entity.user) {
                entity.user_id = entity.user.id;
                const user_updated = await this.updateUser(entity.user);
                delete entity.user;
            }

            if (!entity.user_id) {
                throw new ApolloError(`There is no user's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const meetingUserIds = applyFilters(mockData['meeting_users'], entity).map((i) => i.id);

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
        const entityData = mockData['meeting_users'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        entityData.push(newEntity);
        return newEntity.id;
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
    async updateMeetingUser(params, info) {
        const entityData = mockData['meeting_users'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
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
        const entityData = mockData['meeting_users'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);

        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
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
        return mockData['meetings'].find((relatedRecord) => relatedRecord.id == meetingUser['meeting_id']);
    }
    async findUserByMeetingUser({ meetingUser }, info) {
        return mockData['users'].find((relatedRecord) => relatedRecord.id == meetingUser['user_id']);
    }
    //----------------end of MeetingUser

    //----------------start of Org
    async allOrgs({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        let items = [...mockData['orgs']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPaginationOrgs({ sortField, sortOrder = 'asc', filter = {} }, info) {
        let items = [...mockData['orgs']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async org({ id }, info) {
        return mockData['orgs'].find((d) => d.id == id);
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

        if (!entity.parentOrg_id && entity.parentOrg) {
            if (entity.parentOrg.id) {
                entity.parentOrg_id = entity.parentOrg.id;
            } else {
                const parentOrg_id = await this.createOrg(entity.parentOrg);
                entity.parentOrg_id = parentOrg_id;
            }
            delete entity.parentOrg;
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

        if (entity.parentOrg_id || entity.parentOrg) {
            if (entity.parentOrg) {
                entity.parentOrg_id = entity.parentOrg.id;
                const parentOrg_updated = await this.updateOrg(entity.parentOrg);
                delete entity.parentOrg;
            }

            if (!entity.parentOrg_id) {
                throw new ApolloError(`There is no parentOrg's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const orgIds = applyFilters(mockData['orgs'], entity).map((i) => i.id);

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
        const entityData = mockData['orgs'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        entityData.push(newEntity);
        return newEntity.id;
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
    async updateOrg(params, info) {
        const entityData = mockData['orgs'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
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
        const entityData = mockData['orgs'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);

        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
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
    async findParentOrgByOrg({ org }, info) {
        return mockData['orgs'].find((relatedRecord) => relatedRecord.id == org['parentOrg_id']);
    }
    async getSubOrgsOfOrg({ org }, info) {
        let result = mockData['orgs'].filter((record) => record['parentOrg_id'] == org.id);
        return result;
    }
    async getUsersOfOrg({ org }, info) {
        let result = mockData['users'].filter((record) => record['org_id'] == org.id);
        return result;
    }
    //----------------end of Org

    //----------------start of User
    async allUsers({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        let items = [...mockData['users']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPaginationUsers({ sortField, sortOrder = 'asc', filter = {} }, info) {
        let items = [...mockData['users']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async user({ id }, info) {
        return mockData['users'].find((d) => d.id == id);
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

        if (!entity.org_id && entity.org) {
            if (entity.org.id) {
                entity.org_id = entity.org.id;
            } else {
                const org_id = await this.createOrg(entity.org);
                entity.org_id = org_id;
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

        if (entity.org_id || entity.org) {
            if (entity.org) {
                entity.org_id = entity.org.id;
                const org_updated = await this.updateOrg(entity.org);
                delete entity.org;
            }

            if (!entity.org_id) {
                throw new ApolloError(`There is no org's id in arguments!`, 500);
            }
        }

        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const userIds = applyFilters(mockData['users'], entity).map((i) => i.id);

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
        const entityData = mockData['users'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        entityData.push(newEntity);
        return newEntity.id;
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
    async updateUser(params, info) {
        const entityData = mockData['users'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
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
        const entityData = mockData['users'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);

        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
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
        return mockData['orgs'].find((relatedRecord) => relatedRecord.id == user['org_id']);
    }
    async getMeetingUsersOfUser({ user }, info) {
        let result = mockData['meeting_users'].filter((record) => record['user_id'] == user.id);
        return result;
    }
    async getRelatedMeetingsOfUser({ user }, info) {
        let result = mockData['meeting_users'].filter((record) => record['user_id'] == user.id);
        result = applyFilters(mockData['meetings'], { ids: result.map((r) => r.meeting_id) });
        return result;
    }
    //----------------end of User
};
