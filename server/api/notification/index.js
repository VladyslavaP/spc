'use strict';

var express = require('express');
var controller = require('./notification.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/id/:id', controller.show);
router.post('/', controller.create);
router.put('/id/:id', controller.update);
router.patch('/id/:id', controller.update);
router.delete('/id/:id', controller.destroy);
router.get('/unread/:deviceId', controller.getUnreadForDevice);

module.exports = router;