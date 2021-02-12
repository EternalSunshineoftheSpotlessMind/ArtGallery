const Artwork = require('../models/artwork')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const artwork = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            exports.json({
                error: err
            })
        }
        let artwork = new Artwork ({
            imagePath: req.body.imagePath,
            title: req.body.title,
            itemNumber: req.body.itemNumber,
            description: req.body.description,
            price: req.body.price,
        })
        artwork.save()
            .then(artwork => {
                res.json({
                    message: 'Account created'
                })
            })
            .catch(error => {
                res.json({
                    message: 'Error occurred'
                })
            })
    })
}

module.exports = {
    artwork
}
