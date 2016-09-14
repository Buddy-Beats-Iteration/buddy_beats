const User = require('./../models/userModel');
const cookieController = require('./../util/cookieController');
//Create an object called userController to put methods on
const userController = {};
//import bcrypt for authentication
const bcrypt = require('bcryptjs');


userController.createUser = (request, response, next) => {
  console.log('hit create user route here is body:') 
  console.log(request.body);
  console.log('headers ', request.headers)

  //create new user using our USER model that we exported
  const user = new User(request.body);
  request.newSSID = user._id.toString();
  user.save(function(err) {
    if (err) throw err;
    console.log('User created!');
  });
  next()
};

userController.returnBoards = (request, response, next) => {
  console.log('hit returnBoards route ')
  // console.log('headers ', request.headers)
  //create new user using our USER model that we exported

  //then save it to the database
  const user = new User(request.body);
  user.save(function(err) {
    if (err) throw err;
    console.log('User created!');
  });
  
  next()
};


//

module.exports = userController;