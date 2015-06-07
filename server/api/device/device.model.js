'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: String,
  userId: {
  	type: String,
  	ref: 'User'
  },
  type: String,
  config: {
  	waterModule: {
  		currentWaterAmount : {type: Number, default: 1000},
		minimalWaterAmount : Number, 
		waterAmountThreshold : Number
  	},
  	foodModule: {
  		currentFoodAmount : {type: Number, default: 1000},
			minimalFoodAmount : Number, 
			foodAmountThreshold : Number,
			foodDailyRation : Number
  	},
  	fridgeModule: {
  		fridgeOpenTime : Date
  	},
  	irrigationModule: {
  		currentWaterAmount: {type: Number, default: 1000},
			irrigationFrequency : Number, 
			waterPortion : Number
  	},
  	lightingModule : {
			lightingFrequency : Number, 
			lightingDuration : Number
		},

	sprayingModule : {
			currentSprayingMaterialAmount : {type: Number, default: 1000},
			sprayFrequency : Number, 
						sprayAmount : Number
  	}
	}
});

module.exports = mongoose.model('Device', DeviceSchema);