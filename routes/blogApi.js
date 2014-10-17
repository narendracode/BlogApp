var express = require('express');
var router = express.Router();

var blog = require('../app/controllers/blogApiController');


/* API */
router.get('/',blog.getAll);

router.post('/create',blog.create);

module.exports = router;