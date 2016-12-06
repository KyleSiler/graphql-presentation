var express = require('express');
var router = express.Router();
var movies = require('./../databases/movies_db');
var actors = require('./../databases/actors_db');

router.get('/', function(req, res) {
    var result = [];
    var keys = Object.keys(req.query);

    Object.keys(movies).forEach(function(movieKey) {
        var match = true;
        keys.forEach(function(key) {
            if(!movies[movieKey][key] || (!Array.isArray(movies[movieKey][key]) && !movies[movieKey][key].includes(req.query[key]))) {
                match = false;
            } else if (Array.isArray(movies[movieKey][key]) && containsKey(movies[movieKey][key], req.query[key]) == false) {
                match = false;
            }
        });

        if(match) {
            var copyOfMovie = JSON.parse(JSON.stringify(movies[movieKey]));
            result.push(copyOfMovie);
        }
    });

    result.forEach(function (movie) {
        movie.actors = buildMovieLink(req, movie.title) + '/actors';
        movie.self = buildMovieLink(req, movie.title);
    });

    res.json(result);
});

var containsKey = function(array, key) {
    var hasMatch = false;
    array.forEach(function(value) {
        if(value.includes(key)) {
            hasMatch = true;
        }
    });
    return hasMatch;
}

var buildMovieLink = function(req, movieName) {
    return req.protocol + "://" + req.get('host') + req.baseUrl + '/' + encodeURIComponent(movieName);
}

var buildActorLink = function(req, actorName) {
    return req.protocol + "://" + req.get('host') + '/actors/' + encodeURIComponent(actorName);
}

router.get('/:movie', function(req, res) {
    var result = movies[req.params.movie];
    result.actors = buildMovieLink(req, result.title) + '/actors';
    result.self = buildMovieLink(req, result.title);
    res.json(result);
});

router.get('/:movie/actors', function(req, res) {
    var result = [];
    movies[req.params.movie].actors.forEach(function(value) {
        result.push(actors[value]);
    });

    result.forEach(function(actor) {
        actor.self = buildActorLink(req, actor.name);
        actor.movies = buildActorLink(req, actor.name) + '/movies';
    });

    res.json(result);
});

module.exports = router