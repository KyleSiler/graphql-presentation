var express = require('express');
var app = express();
var movies = require('./routes/movies');

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.use('/movies', movies);


app.listen(process.env.PORT || 8080, function() {
	console.log('Starting server');
});
