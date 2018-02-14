const mongoose = require('mongoose'),
      Pokemon = mongoose.model('pokemons');

exports.newPokemon = function(req, res) {
    const pokemon = new Pokemon(req.body);
    /*pokemon.name = req.body.name;
    pokemon.type = req.body.type;
    pokemon.level = req.body.level;
    pokemon.img = req.body.img;
    pokemon.evolution = req.body.evolution;*/

    pokemon.save(function(err) {
        if (err)
            res.send(err);
        res.json({message: 'Pokemon successfully created'});
    });
};

exports.listAllPokemons = function(req, res) {
    Pokemon.find(function(err, pokemons) {
        if (err)
            res.send(err);
        res.json(pokemons);
    });
};

exports.showPokemon = function(req, res) {
    Pokemon.findById(req.params.id, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

exports.updatePokemon = function(req, res) {
    Pokemon.findById(req.params.id, function(err, pokemon) {
        if (err)
            res.send(err);
        pokemon.name = req.body.name;
        pokemon.type = req.body.type;
        pokemon.level = req.body.level;
        pokemon.img = req.body.img;
        pokemon.evolution = req.body.evolution;

        pokemon.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Pokemon successfully updated'});
        });

    });
};

exports.deletePokemon = function(req, res) {
    Pokemon.remove({
        _id: req.params.pokemon_id
    }, function(err, pokemon) {
        if (err)
            res.send(err);

        res.json({ message: 'Pokemon successfully deleted' });
    });
}