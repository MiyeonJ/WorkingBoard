var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');

var passport = require('passport');
var gcal     = require('google-calendar');
// load up the user model


// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });
    
    passport.use(new GoogleStrategy({
        clientID: config.consumer_key,
        clientSecret: config.consumer_secret,
        callbackURL: "http://localhost:8000/auth/google/callback",
        scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
    },
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
    return done(null, profile);
}
));

};


