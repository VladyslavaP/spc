'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	deviceId: Schema.Types.ObjectId,
	message: String,
	time: Date
});

module.exports = mongoose.model('Notification', NotificationSchema);