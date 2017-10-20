var express = require('express');
var router = express.Router();
var movies_dao = require('./../daos/movies_dao');

router.get('/', function(req, res) {
    var result = movies_dao.getAllMovies(req.query);

    result.map(function (movie) {
        movie.actors = buildMovieLink(req, movie.title) + '/actors';
        movie.self = buildMovieLink(req, movie.title);
        return movie;
    });

    res.json(result);
});

router.get('/:movie', function(req, res) {
    var result = movies_dao.getMovieByTitle(req.params.movie);
    result.actors = buildMovieLink(req, result.title) + '/actors';
    result.self = buildMovieLink(req, result.title);
    res.json(result);
});

router.get('/:movie/actors', function(req, res) {
    var result = movies_dao.getActorsByMovie(req.params.movie, req.query);

    result.forEach(function(actor) {
        actor.self = buildActorLink(req, actor.name);
        actor.movies = buildActorLink(req, actor.name) + '/movies';
    });

    res.json(result);
});

var buildMovieLink = function(req, movieName) {
    return req.protocol + "://" + req.get('host') + req.baseUrl + '/' + encodeURIComponent(movieName);
}

var buildActorLink = function(req, actorName) {
    return req.protocol + "://" + req.get('host') + '/actors/' + encodeURIComponent(actorName);
}

module.exports = router