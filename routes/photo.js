var express = require('express');
var router = express.Router();

/* get the controllers */
var photo = require('../app/controllers/photoController');

// show the photo upload form

router.get('/', function(req, res) {
    res.render('photoUpload.ejs', { 
        title:'Upload Photo Graph', 
        photo: ''
    });
});

router.post('/upload',photo.upload);

module.exports = router;