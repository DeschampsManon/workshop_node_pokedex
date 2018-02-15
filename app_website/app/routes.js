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
                { pokemons: pokemons }
            )
        })
        .catch(function(error) {
            console.log('ERROR :' + error);
        });
});






//router.get('/contact', function(req, res) {
    //res.render('pages/contact');
//});

//router.post('/contact', function(req, res) {
    //res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
//});