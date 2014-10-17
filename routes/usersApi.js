var express = require('express');
var router = express.Router();

/* get the controllers */
var users = require('../app/controllers/userController');

/* Middleware used for all requests */
/*
router.use(function(req,res,next){
	//do loggin
	console.log('Something is happening');	
	next();
});
*/

/* GET users listing. */

/* API */
router.get('/',users.getAll);

router.post('/create',users.create);

router.get('/:user_id',users.get);
router.put('/:user_id',users.update);
router.delete('/:user_id',users.delete);
module.exports = router;
