export { GraphQLUpload } from 'apollo-server-core';
import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLScalarType, GraphQLError, Kind } from 'graphql';

export class File {
    constructor(readonly id?, readonly fileName?, readonly fullPath?, readonly thumbnail?, readonly mimetype?) {}
}

export const FileType = new GraphQLObjectType({
    name: 'File',
    fields: {
        id: { type: GraphQLID },
        fileName: { type: GraphQLString },
        fullPath: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        mimetype: { type: GraphQLString }
    }
});
export const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
        // value comes from the client
        return new Date(value); // sent to resolvers
    },
    serialize(value) {
        // value comes from resolvers
        return value.toISOString(); // sent to the client
    },
    parseLiteral(ast) {
        // ast comes from parsing the query
        // this is where you can validate and transform
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    }
});
