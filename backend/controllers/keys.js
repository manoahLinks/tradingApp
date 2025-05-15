const Keys = require('../models/keys')

exports.getAllKeys = async (req, res) => {
    try {
        
        const keys = await Keys.find({})
        return res.status(200).json({message: 'success', data: keys})

    } catch (error) {
        return res.json({error: error.message, message: 'Couldnt find all keys'})
    }
}

exports.addKey = async (req, res) => {
    try {

        const { user, keyType, key} = req.body

        const newKeys = await Keys.create({user, keyType, key})
        return res.status(201).json({message: 'Successs', data: newKeys})
        
    } catch (error) {
        return res.json({error: error.message, message: 'An error occured while adding key'})
    }
}