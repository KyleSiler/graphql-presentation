var express = require('express');
var app = express();
var movies = require('./routes/movies');
var actors = require('./routes/actors');

app.get('/', function(req, res) {
	var baseUrl = req.protocol + "://" + req.get('host');
	var result = {
		movies : baseUrl + '/movies',
		actors : baseUrl + '/actors'
	};

	res.json(result);
});

app.use('/movies', movies);
app.use('/actors', actors);

app.listen(process.env.PORT || 8080, function() {
	console.log('Starting server');
});
