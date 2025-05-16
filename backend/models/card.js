const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: {type: String},
    phone: {type: Number},
    address: {type: String},
    ssn: {type: Number},
    createdBy: {type: mongoose.Types.ObjectId}

}, {timestamps: true})


const Cards = mongoose.model('card', cardSchema)

module.exports = Cards;
