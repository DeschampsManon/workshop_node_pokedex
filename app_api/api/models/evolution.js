const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      uniqueValidator = require('mongoose-unique-validator');


const evolutionSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: true
    },
    condition: {
        type: String
    }
});

evolutionSchema.plugin(uniqueValidator, {message: "This evolution already exist"});

module.exports = mongoose.model('evolutions', evolutionSchema);