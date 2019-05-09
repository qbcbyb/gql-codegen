import { DataSource, isSqliteDataSource, SourceRelationshipMap } from '../model/data-source';
import { DataReader } from './data-reader';
import { MockDataReader } from './mock/mock-reader';
import { EntitiesWithSchema } from '../model/entities-with-schema';
declare function require(moduleName: string): any;
import { SqliteDataReader as SqliteReader } from './sqlite/sqlite-reader';

function createDataReader(data: DataSource): DataReader {
    if (isSqliteDataSource(data)) {
        const SqliteDataReader: typeof SqliteReader = require('./sqlite/sqlite-reader');
        return new SqliteDataReader();
    }
    return new MockDataReader();
}

export async function parseSourceData(
    data: DataSource,
    relationship: SourceRelationshipMap
): Promise<EntitiesWithSchema> {
    const dataReader = createDataReader(data);
    return dataReader.parseSourceData(data, relationship);
}
