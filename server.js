var fs = require('fs'),
		bodyParser = require('body-parser'),
		express = require('express'),
		path = require('path'),
		app = express(),
		mongoose = require('mongoose'),
		votes = require('./models/votes.js'),
		config = require('./config.js');

app.set('port', (process.env.PORT || 3000));

mongoose.connect("mongodb://"+config.database+":27017/", function (err, res) {
  if (err) {
  console.log ('ERROR connecting to db' + err);
  } else {
  console.log ('Succeeded connected to db');
}});

app.use('/', express.static(path.join(__dirname,'public')));



app.get('/createvoter/:id', function(req, res, next){
  var temp = new votes.model({ 
  	  questionid: req.params.id,
	  poll:[0,0,0,0,0]
  });
  temp.save(function(err,data){
    if(err) res.send("saved: failed");
    res.redirect('/showvoter/'+req.params.id);
  });
});

app.get('/showvoters', function(req, res, next){
   votes.model.find({},function(err,users){
    var userMap = {};
    users.forEach(function(user){
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

app.get('/incrementvoter/:id/:answer', function(req, res, next){
  votes.model.findOne({questionid:req.params.id}, function(err, user){
  	var temppoll = user.poll;

  	votes.model.find({_id:user._id}).remove(function(err){
  		
  	});

	  var temp = new votes.model({ 
	  	  questionid: req.params.id,
		  poll:temppoll
	  });
	  temp.poll[req.params.answer] = temp.poll[req.params.answer] + 1;
	  console.log(temp);

	  temp.save(function(err){
	    if(err) res.send("saved: failed");
	    res.redirect('/showvoter/'+req.params.id);
	  });
	 
   });
});

app.get('/showvoter/:id', function(req,res,next){
  votes.model.findOne({questionid:req.params.id}, function(err, user){
    if(err) res.send("failed");
    else res.send(user);
  });
})

app.get('/vote/:id/:answer', function(req, res, next){
	
});

app.get('/deletevoters', function(req, res, next){
	votes.model.remove().exec();
	res.send('deleted')
})

app.get('/delete/:id', function(req,res,next){
  votes.model.findOne({_id:req.params.id}).remove(function(err){
    if(err) res.send("failed");
    else res.send("removed: "+req.params.id);
  });
});




//creates a user 
//urlparams: POST:/api/v0.1/users/
//post: 'phone', 'password'
function createUser(req, res){
	//TODO: check if valid input
	var encryptedPasswordInput = require('crypto').createHash('md5').update(req.body.password).digest('hex');
	var tempUser = new User.model({
		phone: req.body.phone,
		password: encryptedPasswordInput
	});
	tempUser.save(function(err, data){
		if(err) res.send({status:400, data:null, message:err});
		else res.send({status:200, data:null, message:tempUser+" Saved"});
	}); 
}
//prints out all users
//urlparams: GET:/api/v0.1/users/
function readUsers(req, res){
	User.model.find({},function(err, users){
		var userMap = {};
		users.forEach(function(user){
			userMap[user._id] = user;
		})
		if(err) res.send({status:400, data:null, message:err});
		else res.send({status:200, data:userMap, message:"Fetching Users"});
	});
}
//reads a single user with phone param
//urlparams: GET:/api/v0.1/users/PHONENUMBER
function readUser(req, res){
	User.model.find({phone:req.params.phone}, function(err, user){
		if(err) res.send({status:400, data:null, message:err});
		else res.send({status:200, data:user, message:user.phone+" Fetched"})
	});
}

//deletes a user
//urlparams: DELETE:/api/v0.1/users/PHONENUMBER
function deleteUser(req, res){
	User.model.findOne({_id:req.params.phone}).remove(function(err){
		if(err) res.send({status:400, data:null, message:err});
		else res.send({status:200, data:null, message:req.params.phone+" Removed"});
	});
}
//deletes all users
//urlparams: DELETE:/api/v0.1/users/
function deleteUsers(req, res){
	User.model.remove().exec();
	res.send({status:200, data:null, message:"Deleted "+User});
}

//crud user
app.post('/users', createUser);
app.get('/users', readUsers);
app.delete('/users', deleteUsers);



app.listen(app.get('port'),function(){
	console.log('server started: http://localhost:' + app.get('port') + '/');
});
