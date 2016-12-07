var containsKey = function(array, key) {
    var hasMatch = false;
    array.forEach(function(value) {
        if(value.includes(key)) {
            hasMatch = true;
        }
    });
    return hasMatch;
}

module.exports = { 
    filterMovieByQuery : function(movies, query) {
        var queryParams = Object.keys(query);

        var result = movies
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
    },
    filterActorsByQuery : function(actors, query) {
        var queryParams = Object.keys(query);

        var result = actors
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
    }
}