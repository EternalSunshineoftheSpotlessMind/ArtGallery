const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = new Schema({
    itemNumber: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Artwork = mongoose.model('Artwork', artworkSchema)
module.exports = Artwork