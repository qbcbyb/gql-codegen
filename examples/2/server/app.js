const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const DefaultApi = require('./dataSource/Data2Api'); // change to your own Api here
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = importSchema(path.join(__dirname, './schema/schema.graphql'));
const resolvers = require('./resolver');

const port = 8090;
const nonProduction = process.env.NODE_ENV !== 'production';

// Initialize the app
const app = express();

const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),

    playground: nonProduction,
    tracing: nonProduction,

    dataSources: () => {
        return {
            defaultApi: new DefaultApi()
        };
    }
});
server.applyMiddleware({ app });

// Start the server
app.listen(port, () => {
    console.log(`Go to http://localhost:${port}${server.graphqlPath} to run queries!`);
});
