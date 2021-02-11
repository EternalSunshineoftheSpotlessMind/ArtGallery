const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userData = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model('User', userData)
module.exports = User