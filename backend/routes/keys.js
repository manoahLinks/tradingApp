const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/keys')

router.route('/')
    .get(controller.getAllKeys)
    .post(controller.addKey)

module.exports = router;