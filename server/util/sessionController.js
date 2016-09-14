var Session = function(user, cookieId){
	user: user,
	cookieId: cookieId
	createdAt: new Date();
}

var sessionController = {};
/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = function(req, res, next) {
  // console.log('token cookie inside isloggedin ',req.cookies.token);
  var validSession = if(sessionStorage[session][cookieId]= req.cookies.token && sessionStorage[session][createdAt] - new Date() > 1800000]){function(err, session){
  	if (err) throw err;
    // console.log('mongo return cookeiId ', validSession);
    if (session){
      console.log("session object is ", session);
  		if(session.cookieId === req.cookies.token){
  			console.log('session is active',req.cookies);
  			next();
  		}
  		else {
  			console.log('not active anymore', req.cookies)
  			res.redirect('/logout');
  		}
  	}
  	else {
      console.log('no session', session);
  		res.redirect('/signup');
  		}
	}
  
};

/**
* startSession - create a new Session model and then save the new session to localstorage
* @param cookieId - id to use as the id of the new session
* @param callback - Callback with signature (Session)
*/
sessionController.startSession = function(cookieId, callback) {
  //write code here
  // console.log('saving github token in mongo', cookieId);
  var session = new Session();
  session.cookieId = cookieId;
  session.save(function(err){
      if (err) throw err;
    })
};

module.exports = sessionController;
