var mongoose = require('mongoose');
var User = mongoose.model('User');
var TwitterStrategy  = require('passport-twitter').Strategy;

module.exports = new TwitterStrategy({
			'consumerKey'    : 'consumerkey',
			'consumerSecret' : 'consumersecret',
			'callbackURL'    : 'http://172.23.206.137:3000/auth/twitter/callback'
		},
		function(token, tokenSecret, profile, done) {
			// make the code asynchronous
			// User.findOne won't fire until we have all our data back from Twitter
			process.nextTick(function() {
				User.findOne({
					'twitter.id' : profile.id 
				},
				function(err, user) {
					// if there is an error, stop everything and return that
					// ie an error connecting to the database
					
					if (err)
					   return done(err);

					// if the user is found then log them in
					if (user) {
						console.log("User found  : "+user);
						return done(null, user); // user found, return that user
					}else {
					  // if there is no user, create them
					   var newUser = new User();
					   // set all of the user data that we need
					   
					   console.log("Profile created : "+profile);

					   newUser.twitter.id          = profile.id;
					   newUser.twitter.token       = token;
					   newUser.twitter.username    = profile.username;
					   newUser.twitter.displayName = profile.displayName;
					   // save our user into the database
					   newUser.save(function(err) {
						          if (err)
							     throw err;
							  return done(null, newUser);
							 }
					   );
					   
					    
					}
				}
				);
			});	
		}
);
