const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    itemNumber: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
});

const Artwork = mongoose.model('Artwork', artworkSchema)
module.exports = Artwork
