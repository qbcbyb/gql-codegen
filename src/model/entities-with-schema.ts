import { GraphQLSchema } from 'graphql';
import { Entity } from './entity';
import { DataReader } from '../introspection/data-reader';

export class EntitiesWithSchema {
    constructor(readonly entities: Entity[], readonly schema: GraphQLSchema, readonly reader: DataReader) {}
}
