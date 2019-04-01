import { GraphQLObjectType } from 'graphql';
import { Field } from './field';
/**
 * 实体对象
 * @example
 * 如下文mock.js中的users会解析成一个实体对象
 * {
 *   users:[
 *    {age: 20, firstName: "hello", lastName: "world"}
 *  ]
 * }
 * users即为key，将key通过单数和首字母大写的驼峰转换后即为name
 *
 * Entity {name: "User", key: "users", fields: [...]}
 *
 * @export
 * @class Entity
 */
export interface Entity {
    /**
     * 名称，即GraphQL对象的名称
     *
     * @type {string}
     * @memberof Entity
     */
    readonly name: string;
    /**
     * 实体对象在源数据中的key或源数据库中的表名
     *
     * @type {string}
     * @memberof Entity
     */
    readonly key: string;
    /**
     * 对象的字段集合
     *
     * @type {Field[]}
     * @memberof Entity
     */
    readonly fields: Field[];

    /**
     * 数据库数据源可能会有表或字段的前缀
     *
     * @type {string}
     * @memberof Entity
     */
    readonly prefix?: string;

    readonly type: GraphQLObjectType;
    hasRelationField?: boolean;
    hasTwoRelationField?: boolean;
    readonly hasDate: boolean;
    readonly hasBigInt: boolean;
    readonly hasJSON: boolean;
    readonly hasFile: boolean;
}
