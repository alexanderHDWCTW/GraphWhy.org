var mongoose = require('mongoose');
var VotesSchema = mongoose.Schema;
var Votes = new VotesSchema({
  questionid: Number,
  poll:[Number],
  votes:[{
  	userid: String, 
  	time : { type : Date, default: Date.now }
  }]
});

module.exports.model = mongoose.model("GraphyVotes", Votes);

