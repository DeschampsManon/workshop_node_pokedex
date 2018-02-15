const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const pokemonEvolutionSchema = new Schema({
    //_id: Number,
    pokemon_id: [{type:mongoose.Schema.Types.ObjectId, ref: 'pokemons', required: 'Pokemon is required'}],
    evolution_id: [{type:mongoose.Schema.Types.ObjectId, ref: 'evolutions', required: 'Evolution is required'}]
});

module.exports = mongoose.model('pokemonEvolutions', pokemonEvolutionSchema);