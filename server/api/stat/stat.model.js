'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Stat', StatSchema);