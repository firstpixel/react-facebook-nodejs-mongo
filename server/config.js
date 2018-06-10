module.exports = {
    'development' : {
        'mongoUrl' : 'mongodb://localhost:27017/dbFacebookLogin',
        'debug':true,
        'serverURL':'http://localhost:3002',
        'reactServerURL' : 'http://localhost:3000',
    },
    'production' : {
        'mongoUrl' : 'mongodb://localhost:27017/dbFacebookLogin',
        'debug': false,
        'serverURL':'http://localhost:3002',
        'reactServerURL' : 'http://localhost:3000',
    },     
    'emailFrom':'noreply@localhost',
	'sendGridToken':'',
    'facebook': {
        'clientID': 'Your Facebook AppId',
        'clientSecret': 'Facebook client Secret',
        'callbackURL': 'http://localhost:3002/facebook/',
    },
    'secretKey': '12345-67890-09876-54321',
    'secretAuthKey':'12345-67890-09876-54321',
    
}