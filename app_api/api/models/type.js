const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator');

const typeSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: true
    }
});

typeSchema.plugin(uniqueValidator, {message: "This type already exist"});

module.exports = mongoose.model('types', typeSchema);