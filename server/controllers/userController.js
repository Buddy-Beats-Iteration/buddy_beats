const User = require('./../models/userModel');
// const saltObj = require('./../models/userModel');
const mongoose = require('mongoose');
const cookieController = require('./../util/cookieController');

//Create an object called userController to put methods on
const userController = {};
//import bcrypt for authentication
const bcrypt = require('bcryptjs');


userController.createUser = (req, res, next) => {
  console.log('hit create user route here is body:') 
  console.log(req.body);

  //create new user using our USER model that we exported
  const user = new User(req.body);
  req.newSSID = user._id.toString();
  user.save(function(err) {
    if (err) throw err;
    console.log('User created!');
  });
  next();
};

//in prog

userController.login = (req, res, next) => {
  User.findOne({'username': 'mike'}).exec( function (err, user) {
    if (err) return handleError(err);
    if (bcrypt.compareSync(req.body.password, user.password)){
      console.log('redirecting');
      next();
    }
    else{
      res.send(400, 'bad');
    }
});
};


//

module.exports = userController;