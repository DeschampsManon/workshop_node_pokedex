const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('users');
    PokemonUser = mongoose.model('pokemonUsers');
    Pokemon = mongoose.model('pokemons');

exports.register = function(req, res){
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({token: jwt.sign({ email: user.email, name: user.name, _id: user._id}, 'RESTFULAPIs')});
            }
        }
    });
};

exports.loginRequired = function(req, res, next){
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.newUser = function(req, res) {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({message: 'User successfully created'});
    });
};

exports.listAll = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.getUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.updateUser = function(req, res) {
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
};

exports.deleteUser = function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'User successfully deleted' });
    });
};

exports.getAllPokemonsForUser = function(req, res){
    PokemonUser.find({user: req.params.id}, function(err, pokemonUser) {
        if (err)
            res.send(err);
        res.json(pokemonUser);
    }).populate('pokemon');
};

exports.addPokemonToUser = function(req, res){
    Pokemon.findById(req.params.id_pokemon, function(err, pokemon) {
        if (err)
            res.send(err);
        User.findById(req.params.id_user, function(err, user) {
            if (err)
                res.send(err);

            const pokemonUser = new PokemonUser({
                user: user._id,
                pokemon: pokemon._id
            });

            res.send(pokemonUser);
            pokemonUser.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'Pokemon successfully added to user'});
            });
        });
    });
};

exports.getOnePokemonForUser = function(req, res){
    Pokemon.findById(req.params.id_pokemon, function(err, pokemon) {
        if (err)
            res.send(err);
        res.send(pokemon);
    });
};

exports.deleteUserPokemon = function(req, res){
    PokemonUser.remove({
        user: req.params.id_user,
        pokemon: req.params.id_pokemon
    }, function(err, pokemonUser) {
        if (err)
            res.send(err);

        res.json({ message: 'Pokemon was deleted from user' });
    });
};