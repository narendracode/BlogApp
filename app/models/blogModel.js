var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
    "title"   : { type: String },
    "user_id" : { type: String },
    "blog_uri" :{ type: String },
    "post_date" : { type : Date, default: Date.now},
    "body" : { type: String, default: '' },
    "comments" : [
                    { 'content'  : { type: String },
                      'user_id'  : { type: String },
                      'comment_date'     : { type: Date },
                      'votes'    : [
                                    {
                                    'user_id' : { type: String }
                                    }
                                   ] 
                    }
                ],
    "hidden" : {type:Boolean, default: false }
});

mongoose.model('Blog', BlogSchema);