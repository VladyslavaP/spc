var _ = require('lodash');

module.exports = function(stats) {
	this.stats = stats;
	this.foodStats = _.where(stats, {type: 'food'});
	this.waterStats = _.where(stats, {type: 'water'});

	this.waterEntries = function() {
		return this.waterStats.length;
	};

	this.foodEntries = function() {
		return this.foodStats.length;
	};

	this.foodConsumed = function() {
		return _.reduce(this.foodStats, function(sum, stat) { return sum + stat.consumed; }, 0);
	};

	this.waterConsumed = function() {
		return _.reduce(this.waterStats, function(sum, stat) { return sum + stat.consumed; }, 0);
	};

	this.averageFoodPortion = function() {
		return this.foodConsumed() / this.foodEntries();
	};

	this.averageWaterPortion = function() {
		return this.waterConsumed() / this.waterEntries();
	};

	var days = function(stats) {
		return _.chain(stats)
			.groupBy(function(stat) { return stat.time.getDate(); })
			.size()
			.value();
	}

	var averagePortionPerDay = function(stats) {
		var grouped = _.groupBy(stats, function(stat) { return stat.time.getDate(); });
		var sum = _.chain(grouped)
			.map(function(group) {
				var sum = _.reduce(group, function(sum, stat) { return sum + stat.consumed; }, 0);
				return  sum / group.length;
			})
			.reduce(function(sum, groupSum) { return sum + groupSum; }, 0)
			.value();
		console.log(sum);
		return sum / _(grouped).size();
	};

	this.averageFoodPerDay = function() {
		return averagePortionPerDay(this.foodStats);
	};

	this.averageWaterPerDay = function() {
		return averagePortionPerDay(this.waterStats);
	};

	var averagePortionsPerDay = function(stats) {
		return _.chain(stats)
			.groupBy(function(stat) { return stat.time.getDate(); })
			.map(function(group) { return group.length; })
			.reduce(function(sum, day) { return sum + day; })
			.value() / days(stats);
	}

	this.averageFoodPortionsPerDay = function() {
		return averagePortionsPerDay(this.foodStats);
	};

	this.averageWaterPortionsPerDay = function() {
		return averagePortionsPerDay(this.waterStats);
	};	

	var self = this;

	this.all = function() {
		return {
			food: {
				entries: self.foodEntries(),
				consumed: self.foodConsumed(),
				averagePortion: self.averageFoodPortion(),
				averagePortionPerDay: self.averageFoodPerDay(),
				averagePortionsPerDay: self.averageFoodPortionsPerDay(),
			},
			water: {
				entries: self.waterEntries(),
				consumed: self.waterConsumed(),
				averagePortion: self.averageWaterPortion(),
				averagePortionPerDay: self.averageWaterPerDay(),
				averagePortionsPerDay: self.averageWaterPortionsPerDay(),
			}
		}
	}
}