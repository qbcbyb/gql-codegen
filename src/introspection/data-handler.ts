import { DataSource, isSqliteDataSource, SourceRelationshipMap } from '../model/data-source';
import { DataReader } from './data-reader';
import { MockDataReader } from './mock/mock-reader';
import { EntitiesWithSchema } from '../model/entities-with-schema';

function createDataReader(data: DataSource): DataReader {
    if (isSqliteDataSource(data)) {
        //TODO: add sqliteDataReader
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
