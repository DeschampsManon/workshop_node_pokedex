const express = require('express'),
      router = express.Router();

router.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

router.get('/about', function(req, res){
    res.render('about', {
        title: 'About'
    });
});

router.get('/contact', function(req, res){
    res.render('contact', {
        title: 'Contact'
    });
});

module.exports = router;