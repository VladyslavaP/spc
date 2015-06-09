'use strict';

var _ = require('lodash');
var Device = require('./device.model');

// Get list of devices
exports.index = function(req, res) {
  Device.find(function (err, devices) {
    if(err) { return handleError(res, err); }
    return res.json(200, devices);
  });
};

// Get a single device
exports.show = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    return res.json(device);
  });
};

// Creates a new device in the DB.
exports.create = function(req, res) {
  Device.create({
    name: req.body.name,
    type: req.body.type,
    config: {},
    userId: req.user._id
  }, function(err, device) {
    if(err) { return handleError(res, err); }
    return res.json(201, device);
  });
};

// Updates an existing device in the DB.
exports.update = function(req, res) {
  console.log(req.body);
  Device.findById(req.body._id, function (err, device) {
    if (err) { return handleError(res, err); }
    if(!device) { return res.send(404); }

    device.name = req.body.name;
    device.config = req.body.config;
    device.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, device);
    });
  });
};

exports.updateFromString = function(req, res) {
  var updated = JSON.parse(req.body.obj);
  Device.findById(updated._id, function(err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    var upToDate = _.merge(device, updated);
    device.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, device);
    });
  });
};

// Deletes a device from the DB.
exports.destroy = function(req, res) {
  Device.findById(req.params.id, function (err, device) {
    if(err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    device.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.getUserDevices = function(req, res) {
  Device
   .find()
   .populate('userId')
   .exec(function(err, devices) {
      if (err) { 
        handleError(res, err);
      }
      var owned = _.filter(devices, function(d) { 
        return d.userId._id.toString() === req.user._id.toString(); 
      });
      res.json(200, owned);
   });
};

function handleError(res, err) {
  return res.send(500, err);
}