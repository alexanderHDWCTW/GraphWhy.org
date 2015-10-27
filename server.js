var fs = require('fs'),
		bodyParser = require('body-parser'),
		express = require('express'),
		path = require('path'),
		app = express();

var CommentsFile = path.join(__dirname, 'comments.json');
var VotesFile = path.join(__dirname, 'votes.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname,'public')));

app.listen(app.get('port'),function(){
	console.log('server started: http://localhost:' + app.get('port') + '/');
});
