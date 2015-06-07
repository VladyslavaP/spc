'use strict';

var express = require('express');
var controller = require('./device.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/id/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/id/:id', controller.update);
router.post('/update/', controller.update);
router.delete('/id/:id', controller.destroy);
router.get('/user', auth.isAuthenticated(), controller.getUserDevices);


module.exports = router;