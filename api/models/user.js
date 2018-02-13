const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    pokemons: [{type:mongoose.Schema.Types.ObjectId, ref: 'pokemon'}]
});

userSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass, this.password)
};

module.exports = mongoose.model('users', userSchema);