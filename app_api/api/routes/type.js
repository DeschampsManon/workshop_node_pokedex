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

const Type = mongoose.model('pokemonTypes');
const type = new Type();

router.route('/types')
// POST
    .post(function(req, res) {
        type.name = req.body.name;

        type.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Type successfully created'});
        });
    })

    // GET ALL
    .get(function(req, res) {
        Type.find(function(err, types) {
            if (err)
                res.send(err);
            res.json(types);
        });
    });


router.route('/type/:id')
// GET TYPE
    .get(function(req, res) {
        Type.findById(req.params.id, function(err, type) {
            if (err)
                res.send(err);
            res.json(type);
        });
    })

    // UPDATE POKEMONTYPE
    .put(function(req, res) {
        Type.findById(req.params.id, function(err, type) {
            if (err)
                res.send(err);
            type.name = req.body.name;

            type.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'Type successfully updated'});
            });
        });
    })

    // DELETE POKEMON
    .delete(function(req, res) {
        Type.remove({
            _id: req.params.id
        }, function(err, type) {
            if (err)
                res.send(err);

            res.json({ message: 'Type successfully deleted' });
        });
    });

module.exports = router;