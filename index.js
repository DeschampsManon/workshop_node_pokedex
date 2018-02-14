const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    models = require('./api/models'),
    jsonwebtoken = require('jsonwebtoken'),
    cheerio = require('cheerio'),
    fetch = require('node-fetch'),
    router = require('./api/routes/router.js');
    changeCase = require('change-case');

mongoose.connect('mongodb://localhost/pokedex');

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
app.use('/api', router.pokemonType_router);
app.use('/api', router.user_router);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

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
get_pokemons(typelist);
return typelist;
})
.catch(err => console.log(err));

function get_pokemons(typelist) {
    fetch("http://www.pokemontrash.com/pokedex/liste-pokemon.php")
        .then(res => res.text())
.then(html => cheerio.load(html))
.then($ => {
        const pokelist = [];
    $("#pokedex-list table").each((index, element) => {
        let generation = index
        $(element).find("tr").each((index, element) => {
        let types = []
        let id = $(element).find('td').first().html();
    let img_relative = $(element).find('td').eq(1).find('img').attr('src');
    let img = 'http://www.pokemontrash.com/pokedex/' + img_relative;
    let name = $(element).find('td').eq(2).find('a').text();
    $(element).find('td').eq(4).find('span').each((index, element) => {
        let type = typelist.indexOf(changeCase.lowerCase($(element).text()));
    types.push(type)
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
    console.log(pokelist)
    return pokelist;
})
.catch(err => console.log(err));
}

