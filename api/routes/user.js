var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokedex');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    console.log('There is a request');
    next();
});

const User = mongoose.model('user');

router.route('/users')
// POST
    .post(function(req, res) {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'User successfully created'});
        });
    })

    // GET ALL
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });


router.route('/users/:id')
// GET USER
    .get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // UPDATE USER
    .put(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'User successfully updated'});
            });
        });
    })

    // DELETE POKEMON
    .delete(function(req, res) {
        User.remove({
            _id: req.params.id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'PokemonType successfully deleted' });
        });
    });

module.exports = router;