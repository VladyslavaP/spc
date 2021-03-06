'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Stat = require('./stat.model');
var Analyzer = require('./stat.analyzer.js');

// Get list of stats
exports.index = function(req, res) {
  Stat.find(function (err, stats) {
    if(err) { return handleError(res, err); }
    return res.json(200, stats);
  });
};

// Get a single stat
exports.show = function(req, res) {
  Stat.findById(req.params.id, function (err, stat) {
    if(err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    return res.json(stat);
  });
};

// Creates a new stat in the DB.
exports.create = function(req, res) {
  Stat.create(req.body, function(err, stat) {
    if(err) { return handleError(res, err); }
    return res.json(201, stat);
  });
};

// Updates an existing stat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stat.findById(req.params.id, function (err, stat) {
    if (err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    var updated = _.merge(stat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stat);
    });
  });
};

// Deletes a stat from the DB.
exports.destroy = function(req, res) {
  Stat.findById(req.params.id, function (err, stat) {
    if(err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    stat.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};



exports.getStats = function(req, res) {
  var dateRange = new Date();
  dateRange.setDate(dateRange.getDate() - parseInt(req.query.days));
  Stat
    .find({ deviceId: mongoose.Types.ObjectId(req.query.deviceId) })
    .where({ time: { $gt: dateRange }})
    .exec(function(err, stats) {
      if(err) { return handleError(res, err); }
      res.json(201, new Analyzer(stats).all());
    });
};

function handleError(res, err) {
  return res.send(500, err);
}