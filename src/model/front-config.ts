export interface BaseFrontendFileConfig {
    readonly exclude?: string[];
    readonly include?: string[];
    readonly fields?: object;
}
export interface FrontendFileConfig extends BaseFrontendFileConfig {
    readonly noNeed?: boolean;
}

export interface UnionSourceConfig {
    [key: string]: EntityUnionSourceConfig;
}
export interface EntityUnionSourceConfig {
    [key: string]:
        | string
        | { [key: string]: { exclude?: string[]; include?: string[] } }
        | [string | { [key: string]: { exclude?: string[]; include?: string[] } }];
}

export interface EntityUnionConfig {
    readonly entityName: string;
    readonly unionConfigs: UnionConfig[];
}

export interface UnionConfig {
    readonly [key: string]: OneUnionConfig;
}
export interface OneUnionConfig extends BaseFrontendFileConfig {
    readonly entityName: string;
}
