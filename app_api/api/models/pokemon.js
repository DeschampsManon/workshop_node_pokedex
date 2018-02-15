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
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemonType'
    },
    img: {
        type: String,
        required: 'Image is required'
    },
    level: {
        type: Number,
        required: 'Level is required'
    },
    generation: {
        type: Number,
        required: 'Generation is required'
    },
    evolution: {
        niveauEvolution : {
            type: Number,
            required: "Evolution level is required"
        },
        evolutionName : {
            type: String,
            required: "Evolution name is required"
        }
    }
});

pokemonSchema.plugin(uniqueValidator, {message: "This pokemon already exist"});

module.exports = mongoose.model('pokemons', pokemonSchema);