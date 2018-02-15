const express = require('express'),
      path = require('path'),
      axios = require('axios'),
      router = express.Router();

module.exports = router;

router.get('/', function(req, res) {
    var pokemons;
    axios.get('http://localhost:3000/api/pokemons')
        .then(function(response) {
            pokemons = response.data;
            res.render(
                'pages/home',
                {
                    title: 'Home',
                    pokemons: pokemons
                }
            )
        });
});

router.get('/login', function(req, res) {
    res.render('pages/login', {title:"Login"});
});


router.post('/login', function(req, res){
    axios.post('http://localhost:3000/api/auth/sign_in', {
        email: req.body.email,
        password: req.body.password
    })
    .then(function(response) {
        var user = response.data;
        console.log(user);
        axios.get('http://localhost:3000/api/pokemons')
            .then(function(response) {
                pokemons = response.data;
                res.render(
                    'pages/home',
                    {
                        title: 'Home',
                        user: user,
                        pokemons: pokemons
                    }
                )
            });
    })
    .catch(function (error) {
        res.render(
            'pages/login',
            {
                title: 'Login',
                message: error.response.data.message
            }
        );
        console.log(error);
    });
});

router.get('/register', function(req, res) {
    res.render('pages/register', {title:"Registration"});
});

router.post('/register', function(req, res){
    axios.post('http://localhost:3000/api/auth/register', {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(function(response) {
        var user = response.data;
            res.render(
                'pages/home',
                {
                    title: 'Home',
                    user: user,
                    pokemons: pokemons
                }
            )
        })
    .catch(function (error) {
        res.render(
            'pages/register',
            {
                title: 'Register',
                message: error.response.data.message
            }
        );
        console.log(error);
    });
});



//router.get('/contact', function(req, res) {
    //res.render('pages/contact');
//});

//router.post('/contact', function(req, res) {
    //res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
//});