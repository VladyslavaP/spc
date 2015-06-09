'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatSchema = new Schema({
  deviceId: { type: String, ref: 'Device'},
  time: Date,
  consumed: { type: Number, default: 0 },
  type: String
});

module.exports = mongoose.model('Stat', StatSchema);