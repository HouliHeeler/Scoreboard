const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    favouriteTeam: {
        type: String,
        required: [true, 'Please select your favourite team']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)