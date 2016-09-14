var Session = function(){
	this.createdAt = new Date();
}

var sessionController = {};
/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = function(req, res, next) {
  // console.log('token cookie inside isloggedin ',req.cookies.token)
	if(sessionStorage[session][cookieId]= req.cookies.token && sessionStorage[session][createdAt] - new Date() > 1800000) {
		next();
			}
	else {
		console.log('not active anymore', req.cookies)
		res.redirect('/logout');
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
