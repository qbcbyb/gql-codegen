import { DataSource, isSqliteDataSource, SourceRelationshipMap } from '../model/data-source';
import { DataReader } from './data-reader';
import { MockDataReader } from './mock/mock-reader';
import { EntitiesWithSchema } from '../model/entities-with-schema';
import { SqliteDataReader } from './sqlite/sqlite-reader';

function createDataReader(data: DataSource): DataReader {
    if (isSqliteDataSource(data)) {
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
