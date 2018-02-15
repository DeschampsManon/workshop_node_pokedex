/* global require process */

const express = require('express'),
	app = express(),
	port = 3000,
	mongoose = require('mongoose'),
	models = require('./api/models/index'),
	ObjectID = require('mongodb').ObjectID,
	jsonwebtoken = require('jsonwebtoken'),
	cheerio = require('cheerio'),
	fetch = require('node-fetch'),
	router = require('./api/routes/router.js'),
	changeCase = require('change-case'),
	pokemons = require('./pokemon_data.json');

mongoose.connect('mongodb://localhost/pokedex');
const conn = mongoose.connection;

app.use(function(req, res, next){
	if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
		jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
			if (err) req.user = undefined;
			req.user = decode;
			next();
		});
	} else{
		req.user = undefined;
		next();
	}
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router.pokemon_router);
app.use('/api', router.user_router);

app.listen(port);

pokemons.forEach(function(key, value) {
	let number = key.Number;
	let name = key.Name;
	let types = key.Types;
    let weight = key.Weight.Minimum;
    let height = key.Height.Minimum;
	let previous_evolutions = [];
    let next_evolutions = [];
    let attacks = [];
	let level = 0
    let img = 'https://raw.githubusercontent.com/fanzeyi/Pokemon-DB/master/img/'+ number + name + '.png';
    if (key.PreviousEvolution && key.PreviousEvolution != 'undefined') {
        key.PreviousEvolution.forEach(function (value) {
            previous_evolutions.push(value.Number)
        });
    }
    if (key.NextEvolution && key.NextEvolution != 'undefined') {
        key.NextEvolution.forEach(function(value) {
            next_evolutions.push(value.Number)
        });
    }
    if (key.FastAttack && key.FastAttack != 'undefined') {
        key.FastAttack.forEach(function(value) {
            attacks.push({ 'name': value.Name,
                           'type': value.Type,
                           'damage': value.Damage
                        })
        });
    }
    models.pokemon.findOne({number: number}, function(error, object) {
        if (!object) {
            const pokemon = {
                _id: new ObjectID(),
                name: name,
                img: img,
                types: types,
                previous_evolutions: previous_evolutions,
                next_evolutions: next_evolutions,
                level: level,
                number: number,
                weight: weight,
                height: height,
                attacks: attacks
            };
            conn.collection('pokemons').insert(pokemon);
        }
    });
});