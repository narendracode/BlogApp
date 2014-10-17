var express = require('express');
var router = express.Router();
var passport = require('passport');

var index = require('../app/controllers/indexController');
var isLoggedIn = require('../app/utils/is_logged_in');
//load controllers


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Blog App' });
});

router.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login', { 
	  title: 'Login',
	  message: req.flash('loginMessage')
	  });
});

// process the login form
 router.post('/login', passport.authenticate('local-login',{
	 successRedirect : '/home', // redirect to the secure profile section
	 failureRedirect : '/login', // redirect back to the signup page if there is an error
	 failureFlash : true // allow flash messages
	 })
 );

/*
router.post('/login', passport.authenticate('local-login',{
	 successRedirect : '/profile', 
	 failureRedirect : '/login', 
	 failureFlash : true 
	 })
 );
*/

// show the signup form
router.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup.ejs', { 
		title:'Signup', 
		message: req.flash('signupMessage') 
		});
});

/*
router.post('/signup',passport.authenticate('local-signup',{
	successRedirect : '/profile', 
	failureRedirect : '/signup', 
	failureFlash : true 
}));
*/

router.post('/signup',passport.authenticate('local-signup',{
	successRedirect : '/home', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


// PROFILE SECTION we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});

/*
router.get('/home', isLoggedIn, function(req, res) {
	res.render('home.ejs', {
		title: 'Home Page !!!',
		user : req.user 
	});
});
*/
router.get('/home', isLoggedIn, index.getAll);
//getAll



//FACEBOOK ROUTES 
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { 
								scope : 'email' 
								}
					          )
);

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',passport.authenticate('facebook', {
									successRedirect : '/profile',
									failureRedirect : '/'
								       }
						          )
);


//Twitter Routes
// route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',passport.authenticate('twitter',{
								   successRedirect : '/profile',
								   failureRedirect : '/' 
								 }
						      )
);


// LOGOUT 
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


// route middleware to make sure a user is logged in
//function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
    //console.log('is loggedin is called.. ');
	//if (req.isAuthenticated())
		//return next();
	
	// if they aren't redirect them to the home page
	//res.redirect('/');
//}
module.exports = router;
