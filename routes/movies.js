var express = require('express');
var router = express.Router();
var movies = [
    { name : 'Oceans Eleven'},
    { name : 'Guardians of the Galaxy'},
    { name : 'Pacific Rim'}
]

router.get('/', function(req, res) {
    if(req.query.name) {
        var result = [];
        movies.forEach(function(value) {
            if(value.name === req.query.name) {
                result.push(value);
            }
        });
        res.json(result);
    } else {
        res.json(movies);
    }
});

router.get('/:movie', function(req, res) {
    movies.forEach(function (value) {
        if(value.name === req.params.movie) {
            res.json(value);
        }
    });
    res.json(null);
});

module.exports = router