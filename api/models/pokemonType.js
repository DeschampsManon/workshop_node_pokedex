const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pokemonTypeSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    }
});

module.exports = mongoose.model('pokemonTypes', pokemonTypeSchema);