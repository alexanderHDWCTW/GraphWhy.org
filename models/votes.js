var mongoose = require('mongoose');
var VotesSchema = mongoose.Schema;
var Votes = new VotesSchema({
  questionid: Number,
  poll:[Number]
});

module.exports.model = mongoose.model("GraphyVotes", Votes);

