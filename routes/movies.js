var express = require('express');
var router = express.Router();
var movies = require('./../databases/movies_db');

router.get('/', function(req, res) {
    var result = JSON.parse(JSON.stringify(movies));
    var keys = Object.keys(req.query);
    console.log(keys);

    if(keys) {
        result = [];
        movies.forEach(function(value) {
            var match = true;
            keys.forEach(function(key) {
                if(!value[key] || !value[key].includes(req.query[key])) {
                    match = false;
                }
            });

            if(match) {
                var copyOfMovie = JSON.parse(JSON.stringify(value));
                result.push(copyOfMovie);
            }
        });
    }

    result.forEach(function (value) {
        value.actors = buildMovieLink(req, value.name) + '/actors';
    });

    res.json(result);
});

var buildMovieLink = function(req, movieName) {
    return req.protocol + "://" + req.get('host') + req.baseUrl + '/' + encodeURIComponent(movieName);
}

router.get('/:movie', function(req, res) {
    var result = null;
    movies.forEach(function (value) {
        if(value.name === req.params.movie) {
            result = value;
        }
    });
    result.actors = buildMovieLink(req, result.name) + '/actors';
    res.json(result);
});

router.get('/:movie/actors', function(req, res) {
    res.json({ name : 'Heres an actor' });
});

module.exports = router