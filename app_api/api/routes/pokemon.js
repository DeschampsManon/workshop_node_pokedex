var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    pokemonHandler = require('../controllers/pokemonController');

mongoose.connect('mongodb://localhost/pokedex');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    console.log('There is a request');
    next();
});

router.route('/pokemons')
    // POST /pokemons créer un pokemon
    .post(pokemonHandler.newPokemon)

    // GET /pokemons liste tous les pokemons
    .get(pokemonHandler.listAllPokemons);


router.route('/pokemons/:id')
    // GET /pokemons/:id récupéré un pokemon
    .get(pokemonHandler.showPokemon)

    // PUT /pokemons/:id modifie le pokemon
    .put(pokemonHandler.updatePokemon)

    // DELETE /pokemons/:id supprime le pokemon
    .delete(pokemonHandler.deletePokemon);

module.exports = router;