var fs = require('fs');
var express = require('express');
var app = express();
var multer = require('multer');
exports.upload = function(req,res){
    // get the temporary location of the file
    var tmp_path = req.files.userPhoto.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './myuploads/images/' + req.files.userPhoto.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) {
                throw err;
            }else{
          //  res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
                res.render('photoUpload.ejs', { 
                    title:'Upload Photo Graph', 
                    photo:'../../images/'+ req.files.userPhoto.name
                });
            }
        });
    });
    
};
