const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    //_id: Number,
    name: {
        type: String,
        required: 'Name is required'
    },
    type: {type: mongoose.Schema.Types.ObjectId,  ref: 'pokemonType'},
    level: {
        type: Number,
        required: 'Level is required'
    },
    img: {
        type: String,
        required: 'Image is required'
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

module.exports = mongoose.model('pokemons', pokemonSchema);