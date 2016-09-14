
var sessionController = require('./sessionController');

var cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;
/**
* setSSIDCookie - store the supplied id in a cookie
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param id - id of the cookie to set
*/
function setSSIDCookie(req, res) {
  // res.cookie('ssid', id, { httpOnly: true });
  //when we get a new user, we get a new SSID cookie with userID
  //then we create a session with the cookie/ssid id
  sessionController.startSession(req.newSSID);
  
}

module.exports = cookieController;
