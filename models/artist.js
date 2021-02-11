const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
    artistEmail: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNum: {
        type: String,
        required: true
    }
})

const Artist = mongoose.model('Artist', artistSchema)
module.exports = Artist