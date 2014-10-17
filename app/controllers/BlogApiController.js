var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var ObjectId = require('mongoose').Types.ObjectId;
exports.create = function(req,res){
    console.log('checkpiont 1'+ JSON.stringify(req.body));
    var blog = new Blog({
        "title"   : req.body.title,
        "user_id" : req.body.user_id,
        "blog_uri" :req.body.blog_uri,
        "body" :  req.body.body
    });

    blog.save(function(err){
        if(err)
            res.json({message: "Error occured while saving"});
        else
            res.json({message: "Blog saved successfully"});
    });
};

exports.getAll = function(req,res){
    Blog.find(function(err,blogs){
        if(err){
            res.send(err);
        }else{
            res.json(blogs);
        }
    });
};

exports.get = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.body.blog_id);
        Blog.findById(id,function(err,blog){
            if(err){
                res.send(err);
            }
            res.json(blog);
        });
    }catch(e){

        res.send(404);
    }
};


exports.update = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.body.blog_id);
        Blog.findById(id,function(err,blog){
            if(err){
                res.send(err);
            }

            blog.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: "Blog Updated successfully"});
            });
        });
    }catch(e){
        res.send(404);
    }
};

exports.delete = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.body.blog_id);
        Blog.remove({_id:id},function(err,blog){
            console.log('checkpoint 4'); 
            if(err){
                console.log("Error is:"+ err);
                res.send(err);
            }
            res.json({message: "Blog deleted successfully"});
        });
    }catch(e){
        res.send(404);
    } 
};