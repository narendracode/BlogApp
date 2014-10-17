var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;
exports.create = function(req,res){
   var user = new User({
      name:"Narendra",
      email:"narendrasoni2@gmail.com",
      username: "narendrasoni1989",
      provider: "provider value",
      hashed_password: "#$#$#$#$#$#"
   });
   
   console.log("------ create---- is called.... ");
   user.save(function(err){
      if(err)
         res.json({message: "Error occured while saving"});
      else
         res.json({message: "saved successfully"});
   });
};

exports.getAll = function(req,res){
	User.find(function(err,users){
		if(err){
			res.send(err);
		}else{
			res.json(users);
		}
	});
};

exports.getProfile = function(req,res){
    console.log("User:"+req.user);
    res.render('editProfile.ejs', {
        title: 'Edit Profile',
        user : req.user 
    }); 
};

exports.saveProfile = function(req,res){
    console.log("profile saved User:"+req.user);
    res.render('editProfile.ejs', {
        title: 'Edit Profile',
        user : req.user 
    }); 
};


exports.get = function(req,res){
	var id ;
	try{
	    req.params.user_id = '543b8b20bcd6970e06c6a893';
	   id = new ObjectId(req.params.user_id);
	   User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});
	}catch(e){
	   
	   res.send(404);
	}
	/*
	User.find({_id:id}).exec(function(err,user){
		if(err || user.length ==0){
			res.send("Error occured");
		}
		res.json(user);
	});

	User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		res.json(user);
	});*/
	
};


exports.update = function(req,res){
	var id ;
	try{
	    req.params.user_id = '543b8b20bcd6970e06c6a893';
	   id = new ObjectId(req.params.user_id);
	   User.findById(id,function(err,user){
		if(err){
			res.send(err);
		}
		//user.username = req.body.username;
		user.username = "min thu";

		//user.email = req.body.email;
		user.email = "minthu@gmail.com";

		//user.name = req.body.name;
		user.name = "Narendra Soni";

		user.save(function(err){
			if(err)
			    res.send(err);
			res.json({message: "user  Updated successfully"});
		});
	});
	}catch(e){
	   res.send(404);
	}
};

exports.delete = function(req,res){
	var id ;
	try{
	   req.params.user_id = '543b8b20bcd6970e06c6a893';
	   id = new ObjectId(req.params.user_id);
	   User.remove({_id:id},function(err,user){
	   	 console.log('checkpoint 4'); 
		if(err){
		   console.log("Error is:"+ err);
		   res.send(err);
		}
	        res.json({message: "User deleted successfully"});
	   });
	}catch(e){
	   res.send(404);
	} 
};
