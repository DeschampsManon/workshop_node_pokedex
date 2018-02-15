const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const typeSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    }
});

module.exports = mongoose.model('types', typeSchema);