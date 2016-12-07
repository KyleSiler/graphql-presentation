var movies = require('./../databases/movies_db');
var dao = {
    getAllMovies : function (query) {
        var queryParams = Object.keys(query);

        var result = Object.keys(movies)
            .map(function(movieKey) { return movies[movieKey];})
            .filter(function(movie) {
                return queryParams.reduce(function(accumulator, param) {
                    if(!movie[param] || (!Array.isArray(movie[param]) && !movie[param].includes(query[param]))) {
                        return false;
                    } else if (Array.isArray(movie[param]) && containsKey(movie[param], query[param]) == false) {
                        return false;
                    }
                    return true && accumulator;
                }, true);
            })
            .map(JSON.stringify)
            .map(JSON.parse);

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