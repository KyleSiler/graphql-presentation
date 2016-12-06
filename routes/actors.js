var express = require('express');
var router = express.Router();
var actors = require('./../databases/actors_db.js');
var movies = require('./../databases/movies_db.js');

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
    return req.protocol + "://" + req.get('host') + '/movies/' + encodeURIComponent(movieName);
}

var buildActorLink = function(req, actorName) {
    return req.protocol + "://" + req.get('host') + '/actors/' + encodeURIComponent(actorName);
}

router.get('/', function(req, res) {
    var result = [];

    var queryParams = Object.keys(req.query);

    Object.keys(actors).forEach(function(actorName) {
        var match = true;
        queryParams.forEach(function(key) {
            if(!actors[actorName][key] || (!Array.isArray(actors[actorName][key]) && !actors[actorName][key].includes(req.query[key]))) {
                match = false;
            } else if (Array.isArray(actors[actorName][key]) && containsKey(actors[actorName][key], req.query[key]) == false) {
                match = false;
            }
        });

        if(match) {
            var copyOfactor = JSON.parse(JSON.stringify(actors[actorName]));
            result.push(copyOfactor);
        }
    });

    result.forEach(function(actor) {
        actor.self = buildActorLink(req, actor.name);
        actor.movies = buildActorLink(req, actor.name) + '/movies';
    });

    res.json(result);
});

router.get('/:actor', function(req, res) {
    var result = actors[req.params.actor];

    result.self = buildActorLink(req, result.name);
    result.movies = buildActorLink(req, result.name) + '/movies';

    res.json(result);
});

router.get('/:actor/movies', function(req, res) {
    var result = [];
    console.log(req.params.actor);
    console.log(actors[req.params.actor]);
    actors[req.params.actor].movies.forEach(function(movie) {
        result.push(movies[movie]);
    });

    result.forEach(function(movie) {
        movie.self = buildMovieLink(req, movie.title);
        movie.actors = buildMovieLink(req, movie.title) + '/actors';
    });

    res.json(result);
});

module.exports = router;