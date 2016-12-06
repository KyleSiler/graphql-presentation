var express = require('express');
var app = express();
var movies = require('./routes/movies');
var actors = require('./routes/actors');

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.use('/movies', movies);
app.use('/actors', actors);


app.listen(process.env.PORT || 8080, function() {
	console.log('Starting server');
});
