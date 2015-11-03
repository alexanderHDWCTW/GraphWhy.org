var mongoose = require('mongoose');
var UserSchema = mongoose.Schema;
var User = new UserSchema({
  email: String,
  password: String
});

module.exports.model = mongoose.model("GraphyUser", User);