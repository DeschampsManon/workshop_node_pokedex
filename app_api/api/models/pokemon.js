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
       type: String
    },
    level: {
        type: Number,
        required: 'Level is required'
    },
    img: {
        type: String,
        required: 'Image is required'
    },
    previous_evolution: {
        type: String
    },
    next_evolution: {
        type: String
    }
});

pokemonSchema.plugin(uniqueValidator, {message: "This pokemon already exist"});

module.exports = mongoose.model('pokemons', pokemonSchema);