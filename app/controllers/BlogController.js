var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');
exports.create = function(req,res){
    var blog = new Blog({
        "title"   : req.body.title,
        "user_id" : req.user._id,
        "blog_uri" : "Dummy Blog Uri",
        "body" :  req.body.body
    });
    
    blog.save(function(err){
        if(err)
            res.json({message: "Error occured while saving"});
        else{
            res.redirect('/home');
        }    
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

exports.createNew = function(req,res,next){
        res.render('newArticle.ejs', {
            title: 'Post New Article',
            user : req.user // get the user out of session and pass to template
        });
};


exports.get = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.params.id);
        Blog.findById(id,function(err,blog){
            if(err){
                res.send(err);
            }else{
                //res.json(blog);
                res.render('blog.ejs', {
                    blog: blog,
                    user : req.user, 
                    title: 'Blog Description',
                    moment: moment
                // get the user out of session and pass to template
               });
          }
        });
    }catch(e){

        res.send(404);
    }
};


exports.update = function(req,res){
    var id ;
    try{
        id = new ObjectId(req.params.blog_id);
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
        id = new ObjectId(req.params.blog_id);
        Blog.remove({_id:id},function(err,blog){
            if(err){
                res.send(err);
            }
            res.json({message: "Blog deleted successfully"});
        });
    }catch(e){
        res.send(404);
    } 
};