var express = require('express');
var app = express();
var movies = require('./routes/movies');

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.use('/movies', movies);


app.listen(3000, function() {
	console.log('Starting server');
});
