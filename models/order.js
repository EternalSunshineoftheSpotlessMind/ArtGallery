const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerEmail: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentGiven: {
        type: String,
        required: true
    },
    changeGiven: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order