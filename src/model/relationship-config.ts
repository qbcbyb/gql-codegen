/**
 * 可通过实体的key获取实体的关联关系配置
 *
 * @export
 * @interface RelationshipConfig
 */
export interface RelationshipConfig {
    readonly [entityKey: string]: EntityRelationship;
}
/**
 * 可通过字段的key获取字段的关联关系配置
 *
 * @export
 * @interface EntityRelationship
 */
export interface EntityRelationship {
    readonly [fieldKey: string]: FieldRelationship;
}
/**
 * 字段的关联关系配置
 *
 * @export
 * @interface FieldRelationship
 */
export interface FieldRelationship {
    readonly entityKey: string;
    readonly fieldKey: string;
    readonly relatedEntityKey: string;
    readonly relatedEntityName: string;
    readonly fieldNameInRelatedEntity: string;
    readonly relatedEntityFieldName: string;
}
