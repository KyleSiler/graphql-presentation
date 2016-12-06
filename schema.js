var graphql = require('graphql');

var schemaObj = new graphql.GraphQLObjectType({
    name: 'GraphQLPresentation',
    description: 'This is a presentation of GraphQL using an IMDB like service',
    fields: function() {
        return {
            movies: {
                type : graphql.GraphQLString,
                resolve: function() {
                    return "Hello world!";
                }
            }
        }
    }
});

var Schema = new graphql.GraphQLSchema( {
    query: schemaObj
});

module.exports = Schema;