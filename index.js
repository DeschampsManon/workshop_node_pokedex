var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    models = require('./api/models');

mongoose.connect('mongodb://localhost/pokedex');
const pokemonType = mongoose.model('pokemonTypes');
const test = new pokemonType();

/*test.name = '';
test.save().then(function(err, result) {
    console.log('pokemonType Created');
});

pokemonType.find((err, pokemonType) => {
    console.log(pokemonType)
});*/

var router = require('./api/routes/router.js');


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router.pokemon_router);
app.use('/api', router.pokemonType_router);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
