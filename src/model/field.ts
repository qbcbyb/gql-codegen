import { GraphQLType, GraphQLOutputType } from 'graphql';

/**
 * 实体对象的字段
 * @example
 * [
 *   {age: 21, first_name: "hello1", last_name: "world1"},
 *   {age: 22, first_name: "hello2", last_name: "world2"},
 * ]
 * 中的first_name转换为
 * Field {name: 'firstName', key: 'first_name', values: ['hello1', 'hello2']}
 * @export
 * @class Field
 */
export interface Field {
    /**
     * 字段名
     *
     * @type {string}
     * @memberof Field
     */
    readonly name: string;
    /**
     * 字段原始的key  
     * OtMRelationField及MtORelationField中均为原始的key
     * @example
     * ``` 
      { 
        orgs:[
          {id: 1, name: "org1"},
          {id: 2, name: "org2"},
        ],
        users:[
          {id: 1, first_name: "hello1", last_name: "world1", org_id: 1},
          {id: 2, first_name: "hello2", last_name: "world2", org_id: 2},
        ]
      }
       ```
       =>  
       ```
        Org:{
            fields:[
                {name:'id',key:'id', ...},
                {name:'name',key:'name', ...},
                {name:'users',key:'org_id', relatedEntityKey: 'users', relatedEntityName: 'User', ...},//MtORelationField
            ]
        }
        User:{
            fields:[
                {name:'id',key:'id',...},
                {name:'first_name',key:'first_name', ...},
                {name:'last_name',key:'last_name', ...},
                {name:'org_id',key:'org_id', ...},
                {name:'org',key:'org_id', relatedEntityKey: 'orgs', relatedEntityName: 'Org', ...},//OtMRelationField
            ]
        },
       ```
     *
     * @type {string}
     * @memberof Field
     */
    readonly key: string;
    readonly values?: any[];
    readonly type: GraphQLType | string;
    hasRelation?: boolean;
}
export interface ManyToOneField extends Field {
    readonly relatedEntityName: string;
    readonly relatedEntityKey: string;
    readonly relatedFieldName: string;
}
export interface OneToManyField extends ManyToOneField {
    readonly isToManyField: true;
}
export interface ManyToManyField extends OneToManyField {
    readonly remoteEntityName: string;
    readonly remoteEntityKey: string;
    readonly remoteFieldKey: string;
}
