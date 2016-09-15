const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const userSchema = new Schema({
  username: { type:String  }, //String,required: true, unique: true
  board: { type: Array  }, //, required: true
  password: { type: String }
});

userSchema.pre('save', function(next){
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
})



module.exports = mongoose.model('User', userSchema);


