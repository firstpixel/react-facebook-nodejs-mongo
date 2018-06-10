var express = require('express');
var router = express.Router();

var expressJwt = require('express-jwt');
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var Config = require('../config');
var md5 = require('md5');

var passportConfig = require('../passport-facebook');


/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
  res.res.status(200).json({"message": "respond with a resource"});
});

router.post('/facebook', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
      var err = new Error('User Not Authenticated');
      return res.status(401).json(err);
    }
    console.log("req.user:" + req.user);

    // prepare token for API
    req.auth = {'id':req.user.id, 'name' :req.user.name, 'picture' : req.user.picture, 'status': req.user.status, 'fbid': req.user.fbid};
    next();
},  Verify.generateToken, Verify.sendToken);

var getCurrentUser = function(req, res, next) {
  console.log("getUser:"+req.decoded.id);
  User.findById(req.decoded.id, {'picture':1, 'status':1, 'name':1, 'fbid':1, '_id':0}, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

var getAllUsers = function(req, res, next) {
  console.log("getAllUser:"+req.decoded.id);
  User.find({'status':0}, {'picture':1, 'status':1, 'name':1, 'fbid':1, '_id':0}, function(err, userList) {
    if (err) {
      next(err);
    } else {
      res.json(userList);
    }
  });
};

var getOne = function (req, res) {
  var user = req.user.toObject();
  res.json(req.user);
};


router.get('/me', Verify.verifyOrdinaryUser, getCurrentUser, getOne);

router.get('/all', Verify.verifyOrdinaryUser, getAllUsers);


module.exports = router;
