const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/user')

router.route('/')
    .get(controller.getAllUsers)
    .post(controller.signup)


router.route('/login')
    .post(controller.login)

router.route('/forgot-password')
    .post(controller.forgotPassword)

router.route('/reset-password')
    .post(controller.resetPassword)

router.route('/update-balance')
    .patch(controller.updateUserBalance) 
    
router.route('/sub-balance')
    .patch(controller.updateUserBalanceMinus) 

router.route('/:id')
    .patch(controller.updateStatus)

router.route('/:email')
    .get(controller.getUserByEmail)



module.exports = router;