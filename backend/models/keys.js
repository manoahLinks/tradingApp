const mongoose = require('mongoose')

const keySchema = new mongoose.Schema({
    user: {type: String},
    keyType: {type: String},
    key: {type: String}

}, {timestamps: true})


const Keys = mongoose.model('key', keySchema)

module.exports = Keys;
