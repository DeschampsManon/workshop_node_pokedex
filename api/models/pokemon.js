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
        type: Number
    },
    img: {
        type: String
    },
    evolution: {
        niveauEvolution : {
            type: Number
        },
        evolutionName : {
            type: String
        }
    }
});

module.exports = mongoose.model('pokemons', pokemonSchema);