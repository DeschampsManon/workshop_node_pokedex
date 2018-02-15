const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const pokemonUserSchema = new Schema({
    //_id: Number,
    user: [{type:mongoose.Schema.Types.ObjectId, ref: 'users', required: 'User is required'}],
    pokemon: [{type:mongoose.Schema.Types.ObjectId, ref: 'pokemons', required: 'Pokemon is required'}]
});

module.exports = mongoose.model('pokemonUsers', pokemonUserSchema);