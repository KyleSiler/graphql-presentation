var graphql = require('graphql');
var movies_dao = require('./daos/movies_dao');

var MovieType = new graphql.GraphQLObjectType({
    name : 'movie',
    fields: function() {
        return {
            title : {
                type : graphql.GraphQLString
            },
            year : {
                type : graphql.GraphQLString
            },
            directors : {
                type : graphql.GraphQLString
            }
        }
    }
});

var schemaObj = new graphql.GraphQLObjectType({
    name: 'GraphQLPresentation',
    description: 'This is a presentation of GraphQL using an IMDB like service',
    fields: function() {
        return {
            movies: {
                type : new graphql.GraphQLList(MovieType),
                resolve: function() {
                    return movies_dao.getAllMovies([]);
                }
            }
        }
    }
});

var Schema = new graphql.GraphQLSchema( {
    query: schemaObj
});

module.exports = Schema;