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
  if(req.body._id) { delete req.body._id; }
  Device.findById(req.params.id, function (err, device) {
    if (err) { return handleError(res, err); }
    if(!device) { return res.send(404); }
    Device.findByIdAndUpdate(
      req.body._id,
      {
       $set: {
        name: req.body.name,
        config: req.body.config
       }
      },
      function(err) {
       if (err) return handleError(res, err);
       return res.json(200, device);
      }
    );
  /*  var updated = _.merge(device, req.body);
    updated.save(function (err) {
      console.log(updated);
      console.log(device);
      if (err) { return handleError(res, err); }
      return res.json(200, device);
    });*/
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