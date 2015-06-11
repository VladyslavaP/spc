'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Notification = require('./notification.model');
var Device = require('../device/device.model');

// Get list of notifications
exports.index = function(req, res) {
  Notification.find(function (err, notifications) {
    if(err) { return handleError(res, err); }
    return res.json(200, notifications);
  });
};

// Get a single notification
exports.show = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function(req, res) {
  Notification.create(req.body, function(err, notification) {
    if(err) { return handleError(res, err); }
    console.log('added notification');
    return res.json(201, notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, notification);
    });
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    notification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.getUnreadForDevice = function(req, res) {
  var date = new Date();
  date.setSeconds(0 - date.getMinutes()*60 - date.getHours()*60*60);
  Notification
    .find({deviceId: mongoose.Types.ObjectId(req.params.deviceId)})
    .where('time')
    .gt(date)
    .where('viewed')
    .equals(false)
    .sort('-time')
    .exec(function(err, notifications) {
      if(err) {
        handleError(res, err);
      } else {
        res.json(200, notifications);
      }
    }); 
};

exports.markViewed = function(req, res) {
  Notification.findById(req.params.id, function(err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    notification.viewed = true;
    notification.save(function() {
      res.send(200);
    });
  });
};

exports.getAllTodayForUser = function(req, res) {
  Device.find(
    { userId: req.user._id},
    function(err, devices) {
      if(err) {
        handleError(res, err);
      } else {
        var devIds = _.pluck(devices, '_id');
        var date = new Date();
        date.setSeconds(0 - date.getMinutes()*60 - date.getHours()*60*60);
        Notification
          .find({ 
            time : { $gt : date }
          })
          .where('deviceId')
          .in(devIds)
          .where('viewed')
          .equals(false)
          .sort('-date')
          .exec(function (err, notifications) {
            if(err) {
              handleError(res, err);
            } else {
              res.json(200, notifications);
            }
        });
      }
    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}