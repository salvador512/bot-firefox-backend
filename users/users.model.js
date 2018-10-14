'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema(
{
	username: {type: String, required: true},
	password: {type: String, required: true},
	status: {type: Boolean, default: false}
})

2
3
UserSchema.statics.findOneByStatus = function (status, callback) {
    this.findOne({ status:status }, callback);
};

module.exports = mongoose.model('User', UserSchema);
