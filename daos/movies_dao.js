var movies_db = require('./../databases/movies_db');
var actors_db = require('./../databases/actors_db');
var filters = require('./../filters');

var dao = {
    getAllMovies : function (query) {
        var result = filters.filterMovieByQuery(Object.keys(movies_db)
            .map(function(movieKey) { return movies_db[movieKey];}), query);

        return result;
    },
    getMovieByTitle : function (title) {
        return JSON.parse(JSON.stringify(movies_db[title]));
    },
    getActorsByMovie : function(title, query) {
        var result = [];
        
        movies_db[title].actors
            .map(function(actorName) {
                result.push(JSON.parse(JSON.stringify(actors_db[actorName])));
            });
        
        result = filters.filterActorsByQuery(result, query);

        return result;
    }
}

module.exports = dao;