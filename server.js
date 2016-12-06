var express = require('express');
var graphqlHTTP = require('express-graphql');
var app = express();
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var Schema = require('./schema');

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

app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}));

app.listen(process.env.PORT || 8080, function() {
	console.log('Starting server');
});
