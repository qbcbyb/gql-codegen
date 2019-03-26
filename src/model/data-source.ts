export interface DataSource {}

export interface MockDataSource extends DataSource {
    readonly [entityKey: string]: MockDataEntity[];
}
export interface MockDataEntity {
    readonly [fieldKey: string]: any;
}
export interface SqliteDataSource extends DataSource {
    readonly dbFilePath: string;
    readonly tablePrefix?: string;
    readonly fieldPrefix?: string;
}

export function isSqliteDataSource(data: DataSource): data is SqliteDataSource {
    const sqliteDataSource = data as SqliteDataSource;
    return !!sqliteDataSource.dbFilePath;
}

/**
 *关联关系配置
 * @example
 * {
 *   orgs: {
 *     parentOrg_id: 'orgs'
 *   }
 * }
 *
 * @export
 * @interface SourceRelationshipMap
 */
export interface SourceRelationshipMap {
    readonly [entityKey: string]: SourceEntityRelationship;
}
/**
 * 单个对象的关联关系配置
 * @example
 * {
 *   parentOrg_id: 'orgs'
 * }
 * 或
 * {
 *   parentOrg_id: ['orgs', 'subOrgs']
 * }
 * 或
 * {
 *   parentOrg_id: ['orgs', 'subOrgs', 'parentOrg']
 * }
 *
 * 其中：
 * orgs为关联关系实体在源数据中的key，
 * subOrgs为关联实体反向关联该对象时的字段名，
 * parentOrg为当前字段在当前实体中关联实体的字段名
 *
 * @export
 * @interface SourceEntityRelationship
 */
export interface SourceEntityRelationship {
    readonly [fieldKey: string]: string | [string, string, string?];
}
