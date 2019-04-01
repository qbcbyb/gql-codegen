const path = require('path');
const sqlite = require('sqlite');
const { ApolloError } = require('apollo-server-errors');

{{#if hasFile}}
const uploadHandler = ()=>{
    //add file upload handler
};
{{/if}}

const entityFieldMap={{{entityFieldMap}}};

module.exports = class {

    constructor(){
        this.dbPromise = sqlite.open(path.resolve(__dirname, '{{mockFilePath}}'));
    }

    {{#if entities}}

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
    {{#each entities}}

    //----------------start of {{entityName}}
    async all{{pluralize entityName}}({ sortField, sortOrder = 'asc', page, perPage = 25, filter = {} }, info) {
        return this.filter('{{entityKey}}', { sortField, sortOrder, page, perPage, filter }, this.selectPage(info));
    }
    async nonPagination{{pluralize entityName}}({ sortField, sortOrder = 'asc', filter = {} }, info) {
        return (await this.filter('{{entityKey}}', { sortField, sortOrder, page: null, perPage: null, filter }, this.selectNonPage(info))).list;
    }
    async {{littleCamelize entityName}}({ id }, info) {
        return (await this.filter('{{entityKey}}', { filter:{id} }, this.selectNonPage(info))).list[0];
    }
    {{#if hasRelationField}}
    async createRelated{{pluralize entityName}}(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = {{{manyToManyIdsFields}}};
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
    async updateRelated{{pluralize entityName}}(entity, info) {
        const keys = Object.keys(entity);
        const manyToManyIdsFields = {{{manyToManyIdsFields}}};
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

            const {{littleCamelize entityName}}Ids =(await this.filter('{{entityKey}}',{filter: entity},['id'])).list.map((i) => i.id);
            
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
    async create{{entityName}}(entity, info) {
        {{#if uploadFields}}
        {{#each uploadFields}}
        if(entity['{{name}}']) {
            entity['{{name}}'] = await uploadHandler(entity['{{name}}']);
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
            entity['{{name}}'] = await Promise.all(uploads);
        }
        {{/each}}

        {{/if}}
        return await this.insertInto('{{entityKey}}', entity);
    }
    async batchCreate{{pluralize entityName}}({ {{#littleCamelize entityName}}{{pluralize this}}{{/littleCamelize}}: entitys }, info) {
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
    async update{{entityName}}(entity, info) {
        {{#if uploadFields}}
        {{#each uploadFields}}
        if(entity['{{name}}']) {
            entity['{{name}}'] = await uploadHandler(entity['{{name}}']);
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
            entity['{{name}}'] = await Promise.all(uploads);
        }
        {{/each}}

        {{/if}}
        return await this.update('{{entityKey}}', entity);
    }
    async batchUpdate{{pluralize entityName}}({ {{#littleCamelize entityName}}{{pluralize this}}{{/littleCamelize}}: entitys }, info) {
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
    async remove{{entityName}}({ id }, info) {
        return await this.deleteFrom('{{entityKey}}', id);
    }
    async batchRemove{{pluralize entityName}}({ {{littleCamelize entityName}}Ids: ids }, info) {
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
    async find{{camelize name}}By{{../entityName}}({ {{littleCamelize ../entityName}} }, info) {
        return (await this.filter('{{relatedEntityKey}}', { sortField, sortOrder, page: null, perPage: null, filter:{id:{{littleCamelize ../entityName}}['{{relatedFieldName}}'] } }, this.selectNonPage(info))).list[0];
    }
            {{/each}}
        {{/if}}
        {{#if oneToManyFields}}
            {{#each oneToManyFields}}
    async get{{#pluralize name}}{{camelize this}}{{/pluralize}}Of{{../entityName}}({ {{littleCamelize ../entityName}} }, info) {
        const fields=this.selectNonPage(info);
        let result = (await this.filter('{{relatedEntityKey}}', { sortField, sortOrder, page: null, perPage: null, filter:{ {{key}}:{{littleCamelize ../entityName}}.id } }, [...fields,'id'])).list;
        {{#if remoteEntityKey}}
        result = (await this.filter('{{remoteEntityKey}}', { ids: result.map(r => r.{{remoteFieldKey}}) }, fields)).list;
        {{/if}}
        return result;
    }
            {{/each}}
        {{/if}}
    //----------------end of {{entityName}}
    {{/each}}
    {{/if}}
}

