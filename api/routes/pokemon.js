var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokedex');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function(req, res, next) {
    console.log('There is a request');
    next();
});

const Pokemon = mongoose.model('pokemons');

router.route('/pokemons')
    // POST
    .post(function(req, res) {
        const pokemon = new Pokemon();
        pokemon.name = req.body.name;
        pokemon.type = req.body.type;
        pokemon.level = req.body.level;
        pokemon.img = req.body.img;
        pokemon.evolution = req.body.evolution;

        pokemon.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Pokemon successfully created'});
        });

    })

    // GET ALL
    .get(function(req, res) {
        Pokemon.find(function(err, pokemons) {
            if (err)
                res.send(err);
            res.json(pokemons);
        });
    });


router.route('/pokemons/:id')
    // GET POKEMON
    .get(function(req, res) {
        Pokemon.findById(req.params.id, function(err, pokemon) {
            if (err)
                res.send(err);
            res.json(pokemon);
        });
    })

    // UPDATE POKEMON
    .put(function(req, res) {
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
    })

    // DELETE POKEMON
    .delete(function(req, res) {
        Pokemon.remove({
            _id: req.params.pokemon_id
        }, function(err, pokemon) {
            if (err)
                res.send(err);

            res.json({ message: 'Pokemon successfully deleted' });
        });
    });

module.exports = router;