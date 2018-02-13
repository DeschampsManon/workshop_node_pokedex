const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      pokemonSchema = require('../models/pokemon');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password'
    },
    pokemons: [{type:mongoose.Schema.Types.ObjectId, ref: 'pokemon'}]
});

module.exports = mongoose.model('users', userSchema);