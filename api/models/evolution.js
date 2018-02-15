const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const evolutionSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    condition: {
        type: String
    }
});

module.exports = mongoose.model('evolutions', evolutionSchema);