var fs = require('fs');
exports.upload = function(req,res,next){
    if (req.files) { 
        if (req.files.userPhoto.size() === 0) {
            return next(new Error("Hey, first would you select a file?"));
        }
        
        fs.exists(req.files.userPhoto.path, function(exists) { 
            if(exists) { 
                res.end("Got your file! : "+req.files.userPhoto.path); 
            } else { 
                res.end("Well, there is no magic for those who don’t believe in it!"); 
            } 
        }); 
    }
};