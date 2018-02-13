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

const User = mongoose.model('users');

router.route('/users')
    .post(userHandler.newUser)
    .get(userHandler.listAll);


router.route('/users/:id')
    .get(userHandler.getUser)
    .put(userHandler.updateUser)
    .delete(userHandler.deleteUser);

router.route('/auth/register')
    .post(userHandler.register);

router.route('/auth/sign_in')
    .post(userHandler.sign_in);

module.exports = router;