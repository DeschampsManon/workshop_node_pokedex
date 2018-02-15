var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    userHandler = require('../controllers/userController');

mongoose.connect('mongodb://localhost/pokedex');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    console.log('There is a request');
    next();
});

router.route('/users')
    .post(userHandler.loginRequired, userHandler.newUser)
    .get(userHandler.loginRequired, userHandler.listAll);


router.route('/users/:id')
    .get(userHandler.getUser)
    .put(userHandler.updateUser)
    .delete(userHandler.deleteUser);

router.route('/auth/register')
    .post(userHandler.register);

router.route('/auth/sign_in')
    .post(userHandler.sign_in);

router.route('/users/:id/pokemons')
    .get(userHandler.loginRequired, userHandler.getAllPokemonsForUser);

router.route('/users/:id_user/pokemons/:id_pokemon')
    .post(userHandler.loginRequired, userHandler.addPokemonToUser)
    .get(userHandler.loginRequired, userHandler.getOnePokemonForUser)
    .delete(userHandler.loginRequired, userHandler.deleteUserPokemon);

module.exports = router;