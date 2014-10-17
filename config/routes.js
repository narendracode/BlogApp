var routes = require('../routes/index');
var users = require('../routes/users');
var usersApi = require('../routes/usersApi');
var photo = require('../routes/photo');
var blog = require('../routes/blog');
var blogApi = require('../routes/blogApi');
module.exports = function (app,passport){
    app.use('/', routes);
      
    app.use('/user', users);
    app.use('/api/user', usersApi);
      
    app.use('/api/photo',photo);
     
    app.use('/blog', blog);
    app.use('/api/blog', blogApi);
}




