const { ApolloError } = require('apollo-server-errors');
const { applyFilters } = require('gql-codegen');

{{#if hasFile}}
const uploadHandler = ()=>{
    //add file upload handler
};
{{/if}}

const mockData = require('{{mockFilePath}}');

Object.keys(mockData).forEach((k) => {
    if (k.startsWith('__')) {
        delete mockData[k];
    } else {
        mockData[k] = mockData[k].filter((i) => !i.id || i.id >= 0);
    }
});

module.exports = class {
    {{#if entities}}
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
            pages: perPage ? Math.ceil(total / perPage) : -1,
        };
    }
    {{#each entities}}

    //----------------start of {{entityName}}
    async all{{pluralize entityName}}({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }) {
        let items = [...mockData['{{entityKey}}']];

        return this.filter(items, { sortField, sortOrder, page, perPage, filter });
    }
    async nonPagination{{pluralize entityName}}({ sortField, sortOrder = 'asc', filter = {} }) {
        let items = [...mockData['{{entityKey}}']];

        return this.filter(items, { sortField, sortOrder, page: null, perPage: null, filter }).list;
    }
    async {{littleCamelize entityName}}({ id }) {
        return mockData['{{entityKey}}'].find((d) => d.id == id);
    }
    {{#if hasRelationField}}
    async createRelated{{pluralize entityName}}(entity) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = {{{jsonStringify manyToManyIdsFields}}};
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(`Field ${manyFields.reduce((s, f) => s + f + ', ', '')} can not created in one time!`, 500);
        }

        {{#if manyToOneFields}}
        {{#each manyToOneFields}}
        if (!entity.{{relatedFieldName}} && entity.{{name}}) {
            if (entity.{{name}}.id) {
                entity.{{relatedFieldName}} = entity.{{name}}.id;
            } else {
                const {{relatedFieldName}} = await this.create{{relatedEntityName}}(entity.{{name}});
                entity.{{relatedFieldName}} = {{relatedFieldName}};
            }
            delete entity.{{name}};
        }
        {{/each}}

        {{/if}}
        if (!manyFields.length) {
            const result_id = await this.create{{entityName}}(entity);
            return [result_id];
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.create{{entityName}}(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return (await Promise.all(promiseArr));
        }
    }
    async updateRelated{{pluralize entityName}}(entity) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = {{{jsonStringify manyToManyIdsFields}}};
        const manyFields = manyToManyIdsFields.filter(({ name }) => keys.includes(name));

        if (manyFields.length > 1) {
            throw new ApolloError(`Field ${ manyFields.reduce((s, f) => s + f + ', ', '') } can not created in one time!`, 500);
        }

        {{#if manyToOneFields}}
        {{#each manyToOneFields}}
        if (entity.{{relatedFieldName}} || entity.{{name}}) {
            if (entity.{{name}}) {
                entity.{{relatedFieldName}} = entity.{{name}}.id;
                const {{name}}_updated = await this.update{{relatedEntityName}}(entity.{{name}});
                delete entity.{{name}};
            }

            if (!entity.{{relatedFieldName}}) {
                throw new ApolloError(`There is no {{name}}'s id in arguments!`, 500);
            }
        }
        {{/each}}

        {{/if}}
        if (!manyFields.length) {
            throw new ApolloError(`Update related field in non many to many mode is not support !`, 500);
        } else {
            const idsField = manyFields[0];

            const ids = entity[idsField.name];
            delete entity[idsField.name];

            const {{littleCamelize entityName}}Ids = applyFilters(mockData['{{entityKey}}'], entity).map((i) => i.id);
            
            await this.batchRemove{{pluralize entityName}}({ {{littleCamelize entityName}}Ids });
            
            const promiseArr = [];
            ids.forEach((id) => {
                promiseArr.push(
                    this.create{{entityName}}(
                        Object.assign({}, entity, {
                            [idsField.key]: id
                        })
                    )
                );
            });
            return (await Promise.all(promiseArr));
        }
    }
    {{/if}}
    async create{{entityName}}(entity) {
        const entityData = mockData['{{entityKey}}'];
        const newId = entityData.length > 0 ? parseInt(entityData[entityData.length - 1].id, 10) + 1 : 0;
        const newEntity = Object.assign({ id: `${newId}` }, entity);

        {{#if uploadFields}}
        {{#each uploadFields}}
        if(entity['{{name}}']) {
            newEntity['{{name}}'] = await uploadHandler(entity['{{name}}']);
        }
        {{/each}}

        {{/if}}
        {{#if uploadListFields}}
        let uploads;
        {{#each uploadListFields}}
        if(entity['{{name}}'] && entity['{{name}}'].length) {
            uploads=[];
            entity['{{name}}'].forEach(file=>{
                uploads.push(uploadHandler(file));
            })
            newEntity['{{name}}'] = await Promise.all(uploads);
        }
        {{/each}}

        {{/if}}
        entityData.push(newEntity);
        return newEntity.id;
    }
    async batchCreate{{pluralize entityName}}({ {{#littleCamelize entityName}}{{pluralize this}}{{/littleCamelize}}: entitys }) {
        if (entitys && entitys.length) {
            const created = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        this.create{{entityName}}(entity).then((entity_id) => {
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
    async update{{entityName}}(params) {
        const entityData = mockData['{{entityKey}}'];
        const indexOfEntity = entityData.findIndex((e) => e.id == params.id);
        if (indexOfEntity != -1) {
            const entity = Object.assign({}, entityData[indexOfEntity], params);
        {{#if uploadFields}}
        {{#each uploadFields}}
            if(params['{{name}}']) {
                entity['{{name}}'] = await uploadHandler(params['{{name}}']);
            }
        {{/each}}
        {{/if}}
        {{#if uploadListFields}}
            let uploads;
        {{#each uploadListFields}}
            if(params['{{name}}'] && params['{{name}}'].length) {
                uploads=[];
                params['{{name}}'].forEach(file => {
                    uploads.push(uploadHandler(file));
                });
                entity['{{name}}'] = await Promise.all(uploads);
            }
        {{/each}}
        {{/if}}
            entityData[indexOfEntity] = entity;
            return true;
        }
        throw new ApolloError(`Can not find entity by id: ${params.id}!`);
    }
    async batchUpdate{{pluralize entityName}}({ {{#littleCamelize entityName}}{{pluralize this}}{{/littleCamelize}}: entitys }) {
        if (entitys && entitys.length) {
            const updated = [];
            try {
                const allPromise = [];
                entitys.forEach((entity) => {
                    allPromise.push(
                        entity.id
                            ? this.update{{entityName}}(entity).then(() => {
                                  updated.push(entity.id);
                              })
                            : this.create{{entityName}}(entity).then((entity_id) => {
                                  updated.push(entity_id);
                              }),
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
    async remove{{entityName}}({ id }) {
        const entityData = mockData['{{entityKey}}'];
        const indexOfEntity = entityData.findIndex((e) => e.id == id);
        
        if (indexOfEntity > -1) {
            entityData.splice(indexOfEntity, 1);
        }
        return indexOfEntity > -1;
    }
    async batchRemove{{pluralize entityName}}({ {{littleCamelize entityName}}Ids: ids }) {
        if (ids && ids.length) {
            const removed = [];
            try {
                const allPromise = [];
                ids.forEach((id) => {
                    allPromise.push(
                        this.remove{{entityName}}({ id }).then(() => {
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
        throw new ApolloError(`Can not find {{littleCamelize entityName}}Ids!`);
    }
        {{#if manyToOneFields}}
            {{#each manyToOneFields}}
    async find{{camelize name}}By{{../entityName}}({ {{littleCamelize ../entityName}} }) {
        return mockData['{{relatedEntityKey}}'].find((relatedRecord) => relatedRecord.id == {{littleCamelize ../entityName}}['{{relatedFieldName}}']);
    }
            {{/each}}
        {{/if}}
        {{#if oneToManyFields}}
            {{#each oneToManyFields}}
    async get{{#pluralize name}}{{camelize this}}{{/pluralize}}Of{{../entityName}}({ {{littleCamelize ../entityName}} }) {
        let result = mockData['{{relatedEntityKey}}'].filter((record) => record['{{key}}'] == {{littleCamelize ../entityName}}.id);
        {{#if remoteEntityKey}}
        result = applyFilters(mockData['{{remoteEntityKey}}'], { ids: result.map(r => r.{{remoteFieldKey}}) });
        {{/if}}
        return result;
    }
            {{/each}}
        {{/if}}
    //----------------end of {{entityName}}
    {{/each}}
    {{/if}}
}

