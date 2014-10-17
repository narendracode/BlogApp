var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var ObjectId = require('mongoose').Types.ObjectId;
exports.getAll = function(req,res){
    Blog.find(function(err,blogs){
        if(err){
            	res.render('home.ejs', {
				blogs: [],
			    title: 'Home Page !!!',
			    user : req.user // get the user out of session and pass to template
		});
        }else{
            //res.json(blogs);
		res.render('home.ejs', {
			//blogs: JSON.stringify(blogs),
			blogs: blogs,
			title: 'Home Page !!!',
			user : req.user // get the user out of session and pass to template
		});
        }
    });
};