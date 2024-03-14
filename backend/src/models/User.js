const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }

}, {versionKey:false})

module.exports = mongoose.model('Users', usersSchema)
