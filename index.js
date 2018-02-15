const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    models = require('./api/models'),
    ObjectID = require('mongodb').ObjectID,
    jsonwebtoken = require('jsonwebtoken'),
    cheerio = require('cheerio'),
    fetch = require('node-fetch'),
    router = require('./api/routes/router.js'),
    changeCase = require('change-case'),
    request = require('request');

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
app.use('/api', router.type_router);
app.use('/api', router.user_router);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

// EVOLUTIONS SCRAPPER
fetch("http://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_par_famille_d%27%C3%A9volution")
.then(res => res.text())
.then(html => cheerio.load(html))
.then($ => {
    $("table.tableaustandard.centre").each((index, element) => {
        $(element).find('tr').each((index, element) => {
            const evolutionlist = [];
            let evolution1 = $(element).find('td').first().find('a').text();
            let condition1 = null
            let evolution2 = $(element).find('td').eq(2).find('a').text();
            let condition2 = $(element).find('td').eq(1).text();
            let evolution3 = $(element).find('td').eq(4).find('a').text();
            let condition3 = $(element).find('td').eq(3).text();
            evolutionlist.push({
                evolution1: evolution1,
                condition1: condition1,
                evolution2: evolution2,
                condition2: condition2,
                evolution3: evolution3,
                condition3: condition3
            });
            //console.log(evolutionlist)
            evolutionlist.forEach(function(value){
                if (evolution1 && evolution1!= undefined && evolution1 != '') {
                    models.evolution.findOne({name: value.evolution1}, function(error, object) {
                        if (!object) {
                            const evolution1 = {
                                _id: new ObjectID(),
                                name: value.evolution1,
                                condition: value.condition1,
                            };
                            conn.collection('evolutions').insert(evolution1)
                        }
                    });
                }
                if (evolution2 && evolution2!= undefined && evolution2 != '') {
                    models.evolution.findOne({name: value.evolution2}, function (error, object) {
                        if (!object) {
                            const evolution2 = {
                                _id: new ObjectID(),
                                name: value.evolution2,
                                condition: value.condition2,
                            };
                            conn.collection('evolutions').insert(evolution2)
                        }
                    })
                }
                if (evolution3 && evolution3!= undefined && evolution3 != '') {
                    models.evolution.findOne({name: value.evolution2}, function (error, object) {
                        if (!object) {
                            const evolution3 = {
                                _id: new ObjectID(),
                                name: value.evolution3,
                                condition: value.condition3,
                            };
                            conn.collection('evolutions').insert(evolution3)
                        }
                    });
                }

            });
        });
    });
})
.catch(err => console.log(err));

// TYPES SCRAPPER
fetch("http://www.pokepedia.fr/Type")
.then(res => res.text())
.then(html => cheerio.load(html))
.then($ => {
    const typelist = [];
    $("table.tableaustandard td").each((index, element) => {
        let type = changeCase.lowerCase($(element).find('img').attr('alt'));
        if (type && type != undefined && type != 'inconnu' && typelist.indexOf(type) <= -1) {
            typelist.push(type);
        }
    });
    typelist.forEach(function(value){
        models.type.findOne({name: value}, function(error, object) {
            if(!object){
                const type = {
                    _id: new ObjectID(),
                    name: value,
                };
                conn.collection('types').insert(type)
            }
        });
    });
})
.catch(err => console.log(err));

// POKEMONS SCRAPPER
fetch("http://www.pokemontrash.com/pokedex/liste-pokemon.php")
.then(res => res.text())
.then(html => cheerio.load(html))
.then($ => {
    const pokelist = [];
    $("#pokedex-list table").each((index, element) => {
        let generation = index
        $(element).find("tr").each((index, element) => {
            let id = $(element).find('td').first().html();
            let img_relative = $(element).find('td').eq(1).find('img').attr('src');
            let img = 'http://www.pokemontrash.com/pokedex/' + img_relative;
            let name = $(element).find('td').eq(2).find('a').text();
            let types = []
            $(element).find('td').eq(4).find('span').each((index, element) => {
                types.push(changeCase.lowerCase($(element).text()));
            });
            pokelist.push({
                id: id,
                name: name,
                img: img,
                generation: generation,
                type: types
            });
        });
    });
    pokelist.sort(function(a, b){
        return a.id - b.id;
    });
    pokelist.forEach(function(value){
        models.pokemon.findOne({name: value.name}, function(error, object) {
            if(!object){
                const pokemon = {
                    _id: new ObjectID(),
                    name: value.name,
                    img: value.img,
                    generation: value.generation,
                    level: 0
                };
                var pokemon_id, pokemon_name, type_id, evolution_id;
                conn.collection('pokemons').insert(pokemon, function (error, result) {
                    result.ops.forEach(function(value) {
                        pokemon_id = value._id
                        pokemon_name = value.name
                    })
                    value.type.forEach(function(value) {
                        models.type.findOne({name: value}, function(error, object) {
                            if (object) {
                                type_id = object._id
                                models.pokemonType.findOne({pokemon_id: pokemon_id, type_id: type_id}, function(error, object) {
                                    if (!object) {
                                        const pokemon_type = {
                                            _id: new ObjectID(),
                                            pokemon_id: pokemon_id,
                                            type_id: type_id,
                                        };
                                        conn.collection('pokemontypes').insert(pokemon_type)
                                    }
                                });
                            }
                        });
                    });
                    models.evolution.findOne({name: pokemon_name}, function(error, object) {
                        if (object) {
                            evolution_id = object._id
                            models.pokemonEvolution.findOne({pokemon_id: pokemon_id, evolution_id: evolution_id}, function(error, object) {
                                if (!object) {
                                    const pokemon_evolution = {
                                        _id: new ObjectID(),
                                        pokemon_id: pokemon_id,
                                        evolution_id: evolution_id,
                                    };
                                    conn.collection('pokemonevolutions').insert(pokemon_evolution)
                                }
                            });
                        }
                    });
                });
            }
        });
    });
})
.catch(err => console.log(err));
