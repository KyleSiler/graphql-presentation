var express = require('express');
var router = express.Router();
var actors_dao = require('./../daos/actors_dao');

var buildMovieLink = function(req, movieName) {
    return req.protocol + "://" + req.get('host') + '/movies/' + encodeURIComponent(movieName);
}

var buildActorLink = function(req, actorName) {
    return req.protocol + "://" + req.get('host') + '/actors/' + encodeURIComponent(actorName);
}

router.get('/', function(req, res) {
    var result = actors_dao.getAllActors(req.query);

    result.forEach(function(actor) {
        actor.self = buildActorLink(req, actor.name);
        actor.movies = buildActorLink(req, actor.name) + '/movies';
    });

    res.json(result);
});

router.get('/:actor', function(req, res) {
    var result = actors_dao.getActorByName(req.params.actor);

    result.self = buildActorLink(req, result.name);
    result.movies = buildActorLink(req, result.name) + '/movies';

    res.json(result);
});

router.get('/:actor/movies', function(req, res) {
    var result = actors_dao.getMoviesByActor(req.params.actor, req.query);

    result.forEach(function(movie) {
        movie.self = buildMovieLink(req, movie.title);
        movie.actors = buildMovieLink(req, movie.title) + '/actors';
    });

    res.json(result);
});

module.exports = router;