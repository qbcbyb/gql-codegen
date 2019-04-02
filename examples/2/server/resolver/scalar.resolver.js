const { DateType } = require('gql-codegen');
const { GraphQLUpload } = require('apollo-server-core');
module.exports = {
    Date: DateType,
    Upload: GraphQLUpload
};
