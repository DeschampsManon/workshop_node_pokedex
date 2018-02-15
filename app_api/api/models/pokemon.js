const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator');

const pokemonSchema = new Schema({
    //_id: Number,
    name: {
        type: String,
        required: 'Name is required',
        unique: true
    },
    types: {
       type: Array
    },
    level: {
        type: Number,
        required: 'Level is required'
    },
    img: {
        type: String,
        required: 'Image is required'
    },
    number: {
        type: Number,
        required: 'Number is required'
    },
    weight: {
        type: String
    },
    height: {
        type: String
    },
    previous_evolution: {
        type: Array
    },
    next_evolution: {
        type: Array
    },
    attacks: {
        type: Array
    }
});

pokemonSchema.plugin(uniqueValidator, {message: "This pokemon already exist"});

module.exports = mongoose.model('pokemons', pokemonSchema);