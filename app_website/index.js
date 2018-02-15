// require our dependencies
const express = require('express'),
      expressLayouts = require('express-ejs-layouts'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

var router = require('./app/routes');
app.use('/', router);

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
    console.log('app started');
});