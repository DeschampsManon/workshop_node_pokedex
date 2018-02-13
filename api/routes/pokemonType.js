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

const PokemonType = mongoose.model('pokemonTypes');
const pokemonType = new PokemonType();

router.route('/pokemonsType')
// POST
    .post(function(req, res) {
        pokemonType.name = req.body.name;

        pokemonType.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'PokemonType successfully created'});
        });
    })

    // GET ALL
    .get(function(req, res) {
        PokemonType.find(function(err, pokemonTypes) {
            if (err)
                res.send(err);
            res.json(pokemonTypes);
        });
    });


router.route('/pokemonsType/:id')
// GET POKEMONTYPE
    .get(function(req, res) {
        PokemonType.findById(req.params.id, function(err, pokemonType) {
            if (err)
                res.send(err);
            res.json(pokemonType);
        });
    })

    // UPDATE POKEMONTYPE
    .put(function(req, res) {
        PokemonType.findById(req.params.id, function(err, pokemonType) {
            if (err)
                res.send(err);
            pokemonType.name = req.body.name;

            pokemonType.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'PokemonType successfully updated'});
            });
        });
    })

    // DELETE POKEMON
    .delete(function(req, res) {
        PokemonType.remove({
            _id: req.params.id
        }, function(err, pokemonType) {
            if (err)
                res.send(err);

            res.json({ message: 'PokemonType successfully deleted' });
        });
    });

module.exports = router;