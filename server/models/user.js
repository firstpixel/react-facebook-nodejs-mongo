// grab the things we need
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    status : { 
      type : Number,
      default: 0 
    },
    accessToken: {      
        type : String
    },
    signedRequest: {      
        type : String
    },
    userID: {      
        type : String
    },
    fbid: {      
        type : String ,
        index: { unique: true },
        required : true 
    },
    name: { 
      type : String ,
      required : true 
    },
    email: { 
      type : String , 
      required : true 
    },
    picture:{ 
      data:{ 
        height:{ type : Number },
        width:{ type : Number },
        is_silhouette:{ type : Boolean },
        url: { type: String}
       },
    },
    hometown: {
        id: {type: String},
        name: {type: String}
    },
    createdAt: {
      type: Date,
      default: Date.now
    }, // Registration date
    OauthId: String,
    OauthToken: String,
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

UserSchema.statics.findOrCreate = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
      'fbid': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      console.log(JSON.stringify(profile));
      if (!user) {
        var userFacebook = new that(
            { name : profile.displayName,  
              email : profile.emails[0].value.trim().toLowerCase(), 
              firstName: profile._json.first_name, 
              lastName: profile._json.last_name , 
              accessToken: profile.accessToken,
              fbid:  profile.id,
              picture: { data: { url: profile.photos[0].value}}
            });

        userFacebook.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
};



UserSchema.methods.getName = function() {
  return (this.firstName + ' ' + this.lastName );
}

UserSchema.methods.getUserByAccessToken = function(token, callback){
  var query = {accessToken: token};
  User.findOne(query, callback);
}

UserSchema.methods.getUserByFBId = function(fbid, callback){
    var query = {'fbid': fbid};
    User.findOne(query, callback);
}

UserSchema.methods.getUserByEmail = function(email, callback){
  var query = {email: email};
  User.findOne(query, callback);
}

//UserSchema.plugin(passportLocalMongoose,{usernameField:'email'});

module.exports = mongoose.model('User', UserSchema);