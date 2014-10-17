var express = require('express');
var router = express.Router();

var blog = require('../app/controllers/blogController');
var isLoggedIn = require('../app/utils/is_logged_in');
/* API */
router.get('/',blog.getAll);
router.get('/create',isLoggedIn,blog.createNew);
router.get('/:id',blog.get);
router.post('/create',isLoggedIn,blog.create);

module.exports = router;
