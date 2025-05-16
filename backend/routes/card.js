const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/card')

router.route('/')
    .get(controller.getAllCards)

router.route('/order')
    .post(controller.orderCard)


module.exports = router;