var actors = require('./../databases/actors_db');
var movies = require('./../databases/movies_db');

var dao = {
    getAllActors : function(query) {
        var result = [];
        var queryParams = Object.keys(query);

        var result = Object.keys(actors)
            .map(function(actorKey) { return actors[actorKey];})
            .filter(function(actor) {
                return queryParams.reduce(function(accumulator, param) {
                    if(!actor[param] || (!Array.isArray(actor[param]) && !actor[param].includes(query[param]))) {
                        return false;
                    } else if (Array.isArray(actor[param]) && containsKey(actor[param], query[param]) == false) {
                        return false;
                    }
                    return true && accumulator;
                }, true);
            })
            .map(JSON.stringify)
            .map(JSON.parse);

        return result;
    },
    getActorByName : function (name) {
        return JSON.parse(JSON.stringify(actors[name]));
    },
    getMoviesByActor : function(name) {
        var result = [];
        
        actors[name].movies
            .map(function(title) {
                result.push(JSON.parse(JSON.stringify(movies[title])));
            });
        return result;
    }
}

var containsKey = function(array, key) {
    var hasMatch = false;
    array.forEach(function(value) {
        if(value.includes(key)) {
            hasMatch = true;
        }
    });
    return hasMatch;
}

module.exports = dao;