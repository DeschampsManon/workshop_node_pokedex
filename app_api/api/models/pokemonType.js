const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const pokemonTypeSchema = new Schema({
    //_id: Number,
    pokemon_id: [{type:mongoose.Schema.Types.ObjectId, ref: 'pokemons', required: 'Pokemon is required'}],
    type_id: [{type:mongoose.Schema.Types.ObjectId, ref: 'types', required: 'Type is required'}]
});

module.exports = mongoose.model('pokemonTypes', pokemonTypeSchema);