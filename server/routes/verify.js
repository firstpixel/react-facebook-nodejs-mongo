var User = require('../models/user');
var jwt = require('jsonwebtoken');
//verify tokens
var config = require('../config');
var md5 = require('md5');
var _this = this;

exports.createToken = function(auth) {
	return jwt.sign({
		id: auth.id
	}, config.secretKey,
	{
		expiresIn: 60 * 120
	});
};

exports.generateToken = function (req, res, next) {
	//console.log("generateToken    ------"+JSON.stringify(req.auth));
	req.token = _this.createToken(req.auth);
	next();
};
  
exports.sendToken = function (req, res) {
	console.log("sendToken    ------"+ JSON.stringify(req.token));
	console.log("APP:"+req.app.get('env'));
	console.log(config[req.app.get('env')].reactServerURL);

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', config[req.app.get('env')].reactServerURL);
  
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
	res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');
  
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);


	res.setHeader('x-access-token', req.token);
	res.status(200).json(req.auth);
};

exports.getToken = function (user) {
	return jwt.sign(user, config.secretKey, {
		expiresIn: 91536000
	}); 
};



exports.verifyOrdinaryUser = function (req, res, next) {
	//check header for token
	var token  = req.headers['x-access-token'];
	console.log(token)
	//decode token
	if (token) {
		//verifies the secret and checks exp
		jwt.verify(token, config.secretKey, function (err, decoded) {
			if (err) {
				var err = new Error('You are not authenticated!');
				err.status = 200;
				return next(err);
			} else {
				//if everything is good, save to request for use in other routes
				console.log(decoded);
				req.decoded = decoded;
				next();
			}
		});
	} else {
		//if ther is no token return error
		var err = new Error('No token provided!');
		err.status = 200;
		console.error(err);
	   	return next(err);
	}
};