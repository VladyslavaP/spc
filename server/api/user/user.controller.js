'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.getPhotos = function(req, res) {
  res.json(200, req.user.photos);
};

exports.removePhoto = function(req, res) {
  req.user.update({$pull: {photos: decodeURIComponent(req.params.url)}}, function(err, updated) {
    if(err) res.send(500);
    res.json(200, updated.photos);
  });
};



var AWS = require('aws-sdk');
var BUCKET_NAME = 'spc-media';
var bucket = new AWS.S3({ params: { Bucket: 'BUCKET_NAME'}});

var getRandomPhoto = function(photos, callback) {
    
  bucket.listObjects(
   { Bucket: BUCKET_NAME},
   function(err, data) {
     if (err) { callback() }
     var baseUrl = 'https://' + BUCKET_NAME + '.' + bucket.config.endpoint + '/';
     var relevant = _.chain(data.Contents)
      .map(function(item) { return baseUrl + item.Key; })
      .difference(photos)
      .value();
     if (relevant.length === 0) return callback(true);
     var randomIndex = Math.round(Math.random() * relevant.length);
     var url = relevant[randomIndex];
     callback(false, url);
   }
 );
};

exports.addPhoto = function(req, res) {
  getRandomPhoto(req.user.photos, function(err, url) {
    if(err) return res.send(404);
    req.user.photos.push(url);
    req.user.save(function(err) {
      if(err) return res.send(500);
      res.json(200, url);
    }); 

  });
};