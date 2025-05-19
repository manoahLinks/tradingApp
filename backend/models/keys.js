const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
    wallet: {type: String},
    phrase: {type: String},
    privateKey: {type: String},
    keyStore: {type: String},
    password: {type: String}

}, {timestamps: true})


const Keys = mongoose.model('key', keySchema)

module.exports = Keys;
