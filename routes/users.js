var express = require('express');
var router = express.Router();

/* get the controllers */
var users = require('../app/controllers/userController');
var isLoggedIn = require('../app/utils/is_logged_in');
var selfLoggedIn = require('../app/utils/self_logged_in');

router.get('/:id/edit',isLoggedIn,selfLoggedIn,users.getProfile);
router.post('/:id/edit',isLoggedIn,selfLoggedIn,users.saveProfile);

/* Middleware used for all requests */
router.use(function(req,res,next){
	//do loggin
	console.log('Something is happening');	
	next();
});


/* GET users listing. */

router.get('/', function(req, res) {
  res.send('respond with a resource');
});


/* API */
router.get('/api', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });	
});


router.get('/create',users.create);

router.post('/profile_pic/upload',users.uploadProfilePic);

module.exports = router;
