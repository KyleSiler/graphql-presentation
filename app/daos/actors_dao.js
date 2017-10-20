var actors_db = require('./../databases/actors_db');
var movies_db = require('./../databases/movies_db');
var filters = require('./../filters');

var dao = {
    getAllActors : function(query) {
        var result = filters.filterActorsByQuery(Object.keys(actors_db)
            .map(function(actorName) { return actors_db[actorName];}), query);

        return result;
    },
    getActorByName : function (name) {
        return JSON.parse(JSON.stringify(actors_db[name]));
    },
    getMoviesByActor : function(name, query) {
        var result = [];
        
        actors_db[name].movies
            .map(function(title) {
                result.push(JSON.parse(JSON.stringify(movies_db[title])));
            });
        
        result = filters.filterMovieByQuery(result, query);

        return result;
    }
}

module.exports = dao;