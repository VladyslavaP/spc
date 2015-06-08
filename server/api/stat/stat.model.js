'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatSchema = new Schema({
  deviceId: { type: String, ref: 'Device'},
  time: Date,
  waterConsumed: { type: Number, default: 0 },
  foodConsumed: { type: Number, default: 0 }
});

module.exports = mongoose.model('Stat', StatSchema);