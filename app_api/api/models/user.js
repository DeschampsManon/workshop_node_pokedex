const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    pokemons: [{type: mongoose.Schema.Types.ObjectId, ref: 'pokemons'}]
});

userSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass, this.password)
};

userSchema.post('remove', function(user) {
    console.log('%s has been removed', user._id);
});

userSchema.plugin(uniqueValidator, {message: "This email is already used"});

module.exports = mongoose.model('users', userSchema);