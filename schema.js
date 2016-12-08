var graphql = require('graphql');
var movies_dao = require('./daos/movies_dao');
var actors_dao = require('./daos/actors_dao');

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
            description : {
                type : graphql.GraphQLString
            },
            directors : {
                type : new graphql.GraphQLList(graphql.GraphQLString)
            },
            writers : {
                type : new graphql.GraphQLList(graphql.GraphQLString)
            },
            actors : {
                type : new graphql.GraphQLList(ActorType),
                args : {
                    name : {
                        type : graphql.GraphQLString,
                        description : "Name of actor"
                    },
                    born : {
                        type : graphql.GraphQLString,
                        description : "Year actor was born"
                    },
                    movies : {
                        type : graphql.GraphQLString,
                        description : "Movies the actor was in"
                    }
                },
                resolve : function(movie, args) {
                    return movies_dao.getActorsByMovie(movie.title, args);
                }
            },
            tags : {
                type : new graphql.GraphQLList(graphql.GraphQLString)
            }
        }
    }
});

var ActorType = new graphql.GraphQLObjectType({
    name : 'actor',
    isIntrospection : true,
    fields: function() {
        return {
            name : {
                type : graphql.GraphQLString
            },
            born : {
                type : graphql.GraphQLString
            },
            movies : {
                type : new graphql.GraphQLList(MovieType),
                args: {
                    title: {
                        type: graphql.GraphQLString,
                        description: "Title of the movie",
                    },
                    year: {
                        type: graphql.GraphQLString,
                        description: "Year the movie was made",
                    },
                    directors: {
                        type: graphql.GraphQLString,
                        description: "Director of the movie",
                    },
                    description : {
                        type : graphql.GraphQLString
                    },
                    writers: {
                        type: graphql.GraphQLString,
                        description: "Writer of the movie",
                    },
                    actors: {
                        type: graphql.GraphQLString,
                        description: "Actor in the movie",
                    },
                    tags: {
                        type: graphql.GraphQLString,
                        description: "Tag for the movie",
                    }
                },
                resolve : function(actor, args) {
                    return actors_dao.getMoviesByActor(actor.name, args);
                }
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
                args: {
                    title: {
                        type: graphql.GraphQLString,
                        description: "Title of the movie",
                    },
                    year: {
                        type: graphql.GraphQLString,
                        description: "Year the movie was made",
                    },
                    directors: {
                        type: graphql.GraphQLString,
                        description: "Director of the movie",
                    },
                    description : {
                        type : graphql.GraphQLString
                    },
                    writers: {
                        type: graphql.GraphQLString,
                        description: "Writer of the movie",
                    },
                    actors: {
                        type: graphql.GraphQLString,
                        description: "Actor in the movie",
                    },
                    tags: {
                        type: graphql.GraphQLString,
                        description: "Tag for the movie",
                    }
                },
                resolve: function(_,args) {
                    return movies_dao.getAllMovies(args);
                }
            },
            actors : {
                type : new graphql.GraphQLList(ActorType),
                args : {
                    name : {
                        type : graphql.GraphQLString,
                        description : "Name of actor"
                    },
                    born : {
                        type : graphql.GraphQLString,
                        description : "Year actor was born"
                    },
                    movies : {
                        type : graphql.GraphQLString,
                        description : "Movies the actor was in"
                    }
                },
                resolve: function(_,args) {
                    return actors_dao.getAllActors(args);
                }
            }
        }
    }
});

var Schema = new graphql.GraphQLSchema( {
    query: schemaObj
});

module.exports = Schema;