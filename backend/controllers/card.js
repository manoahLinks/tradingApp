const Cards = require('../models/card')

exports.getAllCards = async (req, res) => {
    try {
        
        const cards = await Cards.find({})
        return res.status(200).json({message: 'success', data: cards})

    } catch (error) {
        return res.json({error: error.message, message: 'Couldnt find all transactions'})
    }
}

exports.orderCard = async (req, res) => {
    try {

        const { name, address, wallet, phone, ssn} = req.body

        const newOrder = await Cards.create({name, address, wallet, phone, ssn})
        return res.status(201).json({message: 'Successs', data: newOrder})
        
    } catch (error) {
        return res.json({error: error.message, message: 'An error occured while ordering card'})
    }
}