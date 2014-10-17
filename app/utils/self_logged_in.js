function selfLoggedIn(req, res, next) {
    if(req.params.id == req.user._id)
         return next();

    // if they aren't redirect them to the home page
    res.redirect('/home');
}

module.exports = selfLoggedIn;