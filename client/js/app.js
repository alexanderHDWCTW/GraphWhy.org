var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");

var store = {		
	activeQuestion: 0,		
	okGotIt: 0, 
	loggedIn: false
};
var App = React.createClass({
	getInitialState: function() {
		return store;
	},
	componentDidMount: function(){
		var thiss = this;
		$.get('/getlogged', function(data){
			if(data != 'no'){
				store.loggedIn = true;
				thiss.setState(store);
			}
		})
	},
	changeCenter: function(id) {
		store.activeQuestion = id;
		this.setState(store);
	},
	logout: function(){
		var thiss = this;
		$.get('/logout');	
		store.loggedIn = false;
		thiss.setState(store)
	},
	login: function(){
		var emailp = $('#loginp').val();
		var passwordp = $('#passwordp').val();
		var thiss = this;
		$.post('/login', { email: emailp, password: passwordp }, function(data){
			if(data!='no'){
				var tempstate = thiss.state;
				store.loggedIn = true;
				thiss.setState(store)
			}
		});
	},
	regisfunc: function(){
		var emaili = $('#email').val();
		var passwordi = $('#password').val();
		var thiss = this;
		$.post('/users', { email: emaili, password: passwordi }, function(data){
				var emailp = emaili
				var passwordp = data;
				$.post('/login', { email: emailp, password: passwordp }, function(data1){
					if(data1!='no'){
						store.loggedIn = true;
						thiss.setState(store)
					}
				});
				
		});
	},
	render: function() {
		return(
		<div>
		<Center activeQuestion={this.state.activeQuestion}
						  questions={this.props.questions}
						  okGotIt={this.state.okGotIt} 
						  changeCenter={this.changeCenter}
						  loggedIn={this.state.loggedIn} />
		<Drawer changeCenter={this.changeCenter}
						  questions={this.props.questions}
						  activeQuestion={this.state.activeQuestion} 
						  loginfunc={this.login} 
						  regisfunc={this.regisfunc}
						  logoutfunc={this.logout} 
						  loggedIn={this.state.loggedIn}/>
		</div>
		);
	}
});


var Drawer = React.createClass({
	getInitialState: function() {
		var w = $(window).width();
		return {
			showLogin: false,
			width: w
		};
	},
	onClick: function() {
		this.setState({show})
	},
	render: function() {
		var questionTitles = [];
		for (var i=0; i < this.props.questions.length; i++) {
			questionTitles.push(<QuestionLink changeCenter={this.props.changeCenter}
																				questions={this.props.questions}
																				activeQuestion={this.props.activeQuestion}
													  						id={this.props.questions[i].id}
													  						title={this.props.questions[i].title} />); 
		}
		return(
			<div className="fixed drawer mui-col-xs-12 mui-col-sm-3 mui-col-lg-2">
				<header>
					<h3>
						<a href="#">
							GraphWhy.org
						</a>
					</h3>
				</header>
				<div className="mui-divider"></div>
				<br/>
				<ul>
					<SigninButton regisfunc={this.props.regisfunc} loggedIn={this.props.loggedIn} logoutfunc={this.props.logoutfunc} loginfunc={this.props.loginfunc} />
					<li className='category questions'><b>Questions</b></li>
					<ul className='sub'>
						{questionTitles}
					</ul>
					</ul>
			</div>
		)
	}
});

var Footer = React.createClass({
	getInitialState: function() {
		return {showLogin: false};
	},
	onClick: function() {
		this.setState({show})
	},
	render: function() {
		var questionTitles = [];
		for (var i=0; i < this.props.questions.length; i++) {
			questionTitles.push(<QuestionLink changeCenter={this.props.changeCenter}
																				questions={this.props.questions}
																				activeQuestion={this.props.activeQuestion}
													  						id={this.props.questions[i].id}
													  						title={this.props.questions[i].title} />); 
		}
		return(
			<div className="drawer footer mui-col-xs-12 mui--hidden-sm mui--hidden-md mui--hidden-lg">
				<header className='menuHeader'>
					<h3>
						<a href="#">
							GraphWhy.org
						</a>
					</h3>
				</header>
				<div className="mui-divider"></div>
				<ul>
					<SigninButton />
					<li className='category questions'><b>Questions</b></li>
					<ul className='sub'>
						{questionTitles}
					</ul>
					</ul>
			</div>
		);
	}
});
var QuestionLink = React.createClass({
	handleClick: function(id) {
		var self = this;
		return function() {
			self.props.changeCenter(id);
		}
	},
	render: function() {
		
		//var title = this.props.title;
		var activeQuestion = this.props.activeQuestion;
		var check = this.props.questions[activeQuestion].title;
		if (this.props.title == check) {
			if (this.props.title == "About Us") {
				return (
					<a  className='highlight' href='#'><li className="fakeRoot highlight" onClick={ this.handleClick(this.props.id) }>{this.props.title}</li></a>
				);
			} else {
				return(
					<li onClick={ this.handleClick(this.props.id) }><a  className='highlight' href='#'>{this.props.title}</a></li>
				);
			}
		} else {
			if (this.props.title == "About Us") {
				return (
					<a href='#'><li className="fakeRoot" onClick={ this.handleClick(this.props.id) }>{this.props.title}</li></a>
				);
			} else {
				return(
					<li onClick={ this.handleClick(this.props.id) }><a href='#'>{this.props.title}</a></li>
				);
			}
		}
	  }
});

var Center = React.createClass({
	// this.props.activeQuestion
	render: function() {
		return(
			<div className="center mui-col-xs-12 mui-col-sm-9 mui-col-lg-10">
				<Header activeQuestion={this.props.activeQuestion}
								questions={this.props.questions}
								visitor={this.props.visitor} />
				<Banner okGotIt={this.props.okGotIt} />
				<Main activeQuestion={this.props.activeQuestion}
							questions={this.props.questions} 
							visitor={this.props.visitor} 
							loggedIn={this.props.loggedIn} />
			</div>
		);
	}
});
var Banner = React.createClass({
	getInitialState: function() {
		return { okGotIt: true };
	},
	onClick: function() {
		this.setState({okGotIt: !this.state.okGotIt});
	},
	render: function() {
		if (this.state.okGotIt == true) {
			return(
				<div className="banner">
					<div className="bubbleContainer">
						<h3 className="bubble">GraphWhy</h3>
					</div>
					<span onClick={this.onClick} className="close">X</span>
					<div className="taglineContainer">
					<br/><br className="tiny-break"/>
						<h5>The public opinion database</h5>
						<h5 className="">Help fight misunderstanding</h5>
					</div>
				</div>
			);
		} else {
			return (
					<div><br/></div>
			);
		}

	}
});
var Header = React.createClass({
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		//is there a way to read the route in jsx?
		return(
			<header className="fixed header">
 				<h3>{this.props.questions[activeQuestion].category} &#62; {this.props.questions[activeQuestion].breadcrumb}</h3>
			</header>
		);
	}
});
var Main = React.createClass({
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		return(
			<div className="main mui-row"><br/>
				<Question loggedIn={this.props.loggedIn} activeQuestion={this.props.activeQuestion}
								  questions={this.props.questions} />
			</div>
		);
	}
});
var Question = React.createClass({
	getInitialState: function() {
      return {
        questions: this.props.questions
    	};
    },
	incrementVote: function(){
		var qqid = this.props.questions[this.props.activeQuestion].options.length-$('input[name=radioName]:checked', '#myForm').val()-1
		var qid = this.props.questions[this.props.activeQuestion].id;

		$.get('/incrementvoter/'+qid+'/'+qqid, function(data){
			if(data=='no') alert('please sign in first');
			if(data=='alreadyvoted') alert('you can only vote once');
			if(data=='changed') alert('you changed your vote')
			/* TODO: on server side check if voted already
			*/
		})
	
	},
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		if (this.props.questions[activeQuestion].title == "About Us") {
		return (
			<div className="mui-col-xs-12 mui-col-sm-10 mui-col-sm-offset-1"><br/>
				<h1 className='mainHeader'> {this.props.questions[activeQuestion].title} </h1>
				<Comments activeQuestion={this.props.activeQuestion}
								  questions={this.props.questions}/>
			</div>
		);
		} else {
		return(
			<div className="mui-col-xs-12 mui-col-sm-10 mui-col-sm-offset-1"><br/>
				<h1 className='mainHeader'> {this.props.questions[activeQuestion].title} </h1>
				<VoteField loggedIn={this.props.loggedIn} activeQuestion={this.props.activeQuestion}
									 questions={this.props.questions} func={this.incrementVote}/>
				<Data activeQuestion={this.props.activeQuestion}
							questions={this.state.questions}/>
				<Comments activeQuestion={this.props.activeQuestion}
								  questions={this.props.questions}/>
			</div>
		);
		}
	}
});
var VoteField = React.createClass({
	render: function(){
		var activeQuestion = this.props.activeQuestion;
		var	options = [];
		for (var i=0; i < this.props.questions[activeQuestion].options.length; i++){
			options.push(<RadioOption options={this.props.questions[activeQuestion].options[i]} index={i}/> );
		}

		var obj = 
					<div>
					  <div className="warningBox mui--hidden-xs">
					  	<span className='warning '>Please sign in to the left.</span>
					  </div>
					  <div className='warningBox mui--col-12-xs mui--hidden-sm mui--hidden-md mui--hidden-lg'>
					  	<span className='small-warning '>Please sign in Below.</span>
					  </div>
					</div>

		if(this.props.loggedIn) obj = "";

		return(
			<div className="box voteField">
					<form id="myForm">
						{options}
					</form>
					<hr/>
					<span className='mui--pull-right mui--hidden-xs'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				  <button className="mui-btn mui-btn--small mui-btn--primary mui--pull-right" onClick={this.props.func}>Submit</button>
				  <div className="mui--clearfix">
				  {obj}
				  </div>
			</div>
		);
	}
});
var RadioOption = React.createClass({
	render: function() {
		return(
			<div className="mui-radio">
				<label>
						<input value={this.props.index} name="radioName" type="radio"/>
							{this.props.options}
				</label>
			</div>
		);
	}
});
var dataStore = {
	polling: [0,0,0,0,0,0,0]
}
var Data = React.createClass({
	getInitialState: function(){
		return dataStore;
	},
	componentDidMount: function(){
		var thiss = this;
		var qid = this.props.questions[this.props.activeQuestion].id;
		$.get('/showvoter/'+qid, function(data){
			dataStore.polling = data.poll
			thiss.setState(dataStore);
		})
	},
	componentDidUpdate: function(){
		var thiss = this;
		var qid = this.props.questions[this.props.activeQuestion].id;
		$.get('/showvoter/'+qid, function(data){
			dataStore.polling = data.poll
			thiss.setState(dataStore);
		})
	},
	render: function(){
		var activeQuestion =  this.props.activeQuestion;
		var data = [];
			for (var i=0; i < this.state.polling.length; i++){
				data.push(this.state.polling[i]);
				var x = 0;
				if (i > 0) {
					x = i * 18;
				}
			}
		return(
			<div className='box graph'>
				<div className='labelTEMP'>
					<span>A</span>
					<span>B</span>
					<span>C</span>
					<span>D</span>
					<span>E</span>
					<span>F</span>
					<span>G</span>
					<span>H</span>
				</div>
				<div className='centerSVG'>
				<Chart className='centerSVG' width='300px' height='230px'>
					<DataSeries data={data}
									//	  questions={this.props.questions}
									//	  activeQuestion={this.props.activeQuestion}
										  width='300' height='230' color="#3F51B5" /> 
				</Chart>
				</div>
				<div className='tallyTEMP extraTOP'>
					{this.state.polling[7]} votes
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[6]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[5]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[4]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[3] } votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[2]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[1]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.state.polling[0]} votes</span>
				</div>

				<span className='mui--clearfix'></span>
			</div>
		);
	}
}); 
var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },
  render: function() {
    var props = this.props;
    var xScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, 180]);
    var yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.height], 0.05);
    var bars = _.map(this.props.data, function(point, i) {
      return (
        <Bar width={xScale(point)} height={yScale.rangeBand()} offset={yScale(i)} availableHeight={props.height} color={props.color} key={i} />
      )
    });
    return (
      <g>{bars}</g>
    );
  }
});
var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },
  render: function() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        y={this.props.offset} x={this.props.availableHeight - this.props.width} />
    );
  }
});
var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Comments = React.createClass({
	render: function(){
		var activeQuestion = this.props.activeQuestion;
		if (this.props.questions[activeQuestion].title == "About Us") {
			return (
				<AboutUs />
			);
		} else if (this.props.questions[activeQuestion].comments[0].title == "") {
			return (
				<div><br/><br/>
				</div>
			);
		} else {
		return(
			<div className="box">
				<div>
					<h4 className="mui--pull-left"><b>{this.props.questions[activeQuestion].comments[0].vote}</b>&nbsp;- {this.props.questions[activeQuestion].comments[0].name}</h4>
					<h4 className="mui--pull-right">{this.props.questions[activeQuestion].comments[0].date}</h4>
					<div className="mui--clearfix"></div>
				</div>
				<br/>
				<div className="mui--text-black-87 mui--text-body1">
					{this.props.questions[activeQuestion].comments[0].comment}
				</div>
			</div>
		);
	}
	}
});


var SigninButton =  React.createClass({
	getInitialState: function() {
		return { showSignup: false,
						 showLogin: false 
						};
	},
	openSignup: function() {
		this.setState({showSignup: !this.state.showSignup});
		this.setState({showLogin: false});
	},
	openLogin: function() {
		this.setState({showLogin: !this.state.showLogin});
		this.setState({showSignup: false});
	},
	render: function() {
		if(this.props.loggedIn){
			return (
				<div>
					<Logout logoutfunc={this.props.logoutfunc} /> 
				</div>
			);
		}else{
			return (
				<div>
				<li className='category signin' onClick={this.openSignup} ><b>Sign Up</b></li>
				{ this.state.showSignup ? <Signup regisfunc={this.props.regisfunc} /> : null }
				<li className='category signin' onClick={this.openLogin} ><b>Login</b></li>
				{ this.state.showLogin ? <Login loginfunc={this.props.loginfunc} /> : null }
				</div>
			);
		}
	}
});

var Logout = React.createClass({
	render: function() {
		return(
				<div className="signin-social">
						<button onClick={this.props.logoutfunc} className="mui-btn mui-btn--small mui-btn--primary">Logout</button>
					<br/>
					<br/><span className=''> Welcome!</span>
					<span className='version'>version 0.1.1</span>
				</div>
		)
	}
})

var Login = React.createClass({
	render: function() {
		return(
			<div className="">
					<ul className='signin'>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input id="loginp" type="text" />
								<label>Email</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input id="passwordp" type="password" />
								<label>Password</label>
							</div>
						</li>
					</ul>
				<div className="signin-social">
					<br/>
					<div className='mui-col-xs-6'>
					<span>coming:</span>
					<img className="standard-img" src="client/img/signin-facebook.png" />
					<img className="standard-img" src="client/img/signin-google.png" />
					</div>
					<div className='mui-col-xs-6'>
						<button onClick={this.props.loginfunc} className="mui-btn mui-btn--small mui-btn--primary mui--pull-right">Submit</button>
					</div>
					<br/>
					<br/>
					<br/>
				</div>
				<br/>
			</div>
		);
	} 
});

var Signup = React.createClass({
	render: function() {
		return(
			<div className="">
					<ul className='signin'>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input id="email" type="text" />
								<label>Email</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input id="password" type="password" />
								<label>Password</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="password" />
								<label>Confirm Password</label>
							</div>
						</li>
					</ul>
				<div className="signin-social">
					<br/>
					<div className='mui-col-xs-6'>
					<span>coming:</span>
					<img className="standard-img" src="client/img/signin-facebook.png" />
					<img className="standard-img" src="client/img/signin-google.png" />
					</div>
					<div className='mui-col-xs-6'>
						<button onClick={this.props.regisfunc} className="mui-btn mui-btn--small mui-btn--primary mui--pull-right">Submit</button>
					</div>
					<br/>
					<br/>
					<br/>
				</div>
				<br/>
			</div>
		);
	} 
});



var AboutUs = React.createClass ({
	render: function(){
		return (
			<div className='aboutUs'>
				<br/>
				<div className='box'>
				<br/>
					<p>It has been said, 'Your opinion is most valueable possession you have', we believe that is true. This project exists to treat your opinion with the respect it deservers.
					Instead of turning your opinion into private assets, share them with the public. We will never sell information gathered here.</p>
					<p>We are not hear to bottle you up and sell you to the highest bidder. The purpose of GraphWhy is to shed light on the beliefs of other in a straight forward fashion.
					It is a serious problem when society a society does not know the opinions its members. We hope you will agree.</p>
					<p>If you want to contribute please do. Email us with suggestions. Contribute questions you think are important. Share this site with a friend or loved one.</p>
					<br/>
					<p className='mui--pull-right'>Best Regards,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br/><br/>
					<p className='mui--pull-right'>Alexander McNulty,<br/> Thomas Shepard,<br/>Christopher Banh,<br/>Paul Merrill,<br/>Max Cunningham</p>
					<span className='mui--clearfix'></span>
				</div>
				<br/>
				<h4>Contact Information</h4>
				<div className='box'>
				<br/>
					<p>Alexander.McNulty92@gmail.com</p>
					<p>(408)348-9804</p>
				</div>
				<br/>
			</div>
		);
	}
});

/*HOWTO
reset all voters localhost:port/resetvoters
delete all voters localhost:port/deletevoters
delete by id localhost:port/delete/voter._id
show by voter id localhost:port/showvoter/voter._id
show all voters localhost:port/showvoters
increment voter localhost:port/incrementvoter/voter._id/optionnumber
if you create a new question here, create a voter for that question id, should
probably check to see if that question exists using showvoters
*/

var QUESTIONS = [
	{
		id: 0,
		route:["technology", "/"],
		category: "Technology",
		breadcrumb: "Bitcoin",
		title		: "How long will Bitcoin hold its value?",
		options :	[
								" A - Less than 1 year",
								" B - 1 years",
								" C - 2 to 3 years",
								" D - 4 to 8 years",
								" E - 9 to 15 years",
								" F - 16 to 25 years",
								" G - 26 to 40 years",
								" H - 41 or more years"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
		id: 1,
		route:["Relationships", "/"],
		category: "Relationships",
		breadcrumb: "family vs society",
		title		: "Which is more important, family or society?",
		options :	[
								" A - Family, absolutely",
								" B - Family, mostly",
								" C - Family, somewhat",
								" D - Neutral",
								" E - Society, somewhat",
								" F - Society, mostly",
								" G - Society, absolutely",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
		id: 2,
		route:["FederalDebt", "/"],
		category: "Question",
		breadcrumb: "Federal Debt",
		title		: "Should the USA begin paying off their federal debt?",
		options :	[
								" A - Yes, absolutely",
								" B - Yes, mostly",
								" C - Yes, somewhat",
								" D - Neutral",
								" E - Somewhat no",
								" F - Mostly no",
								" G - Absolutely not",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
		id: 3,
		route:["FederalDebt", "/"],
		category: "Question",
		breadcrumb: "military",
		title		: "Should the USA reduce their military budget?",
		options :	[
								" A - Yes, decrease 21% or more",
								" B - Yes, decrease 11-20%",
								" C - Yes, decrease 1-10%",
								" D - It Should not change",
								" E - No, increase 1-10%",
								" F - No, increase 11-20%",
								" G - No, increase 21% or more",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],
		active: true
	},
	{
		id: 4,
		route:"DrugLaw",
		category: "Question",
		breadcrumb: "Drug Law",
		title		: "Should the USA legalize all drugs?",
		options :	[
								" A - Yes, absolutely",
								" B - Yes, mostly",
								" C - Somewhat yes",
								" D - Neutral",
								" E - Somewhat No",
								" F - No, mostly not",
								" G - No, absolutely not",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: false
	},
	{
		id: 5,
		route:["BetterWorld", "/"],
		category: "Question",
		breadcrumb: "Better World",
		title		: "Based on your values, is the world becoming a better place?",
		options :	[
								" A - Yes absolutely",
								" B - Mostly yes",
								" C - Somewhat yes",
								" D - Neutral",
								" E - Somewhat no",
								" F - Mostly no",
								" G - Absolutely not",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
		{
		id: 6,
		route:["Happiness", "/"],
		category: "Question",
		breadcrumb: "Happiness",
		title		: "Are you happy?",
		options :	[
								" A - Yes, absolutely",
								" B - Yes, mostly",
								" C - Yes, somewhat",
								" D - I am not sure",
								" E - Somewhat not",
								" F - Mostly not",
								" G - Absolutely not",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
		id: 7,
		route:["WorkEthic", "/"],
		category: "Question",
		breadcrumb: "Happiness",
		title		: "How hard do you work?",
		options :	[
								" A - I push my limits everyday!",
								" B - I work very hard.",
								" C - I work hard.",
								" D - So so",
								" E - I don't work hard.",
								" F - I hardly ever work.",
								" G - I don't work hard at all!",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
		id: 8,
		route:["Veganism", "/"],
		category: "Question",
		breadcrumb: "Veganism",
		title		: "Do you support Veganism?",
		options :	[
								" A - I strongly support Veganism.",
								" B - I mostly support Veganism.",
								" C - I somewhat support Veganism.",
								" D - Neutral",
								" E - I somewhat oppose Veganism.",
								" F - I mostly oppose Veganism.",
								" G - I strongly oppose Veganism.",
								" H - None of the above"
							],
		comments: [{	vote:"", 	name:"",	title:"",		date:"",	comment:""	}],

		active: true
	},
	{
	id: 9,
	route:"AboutUs",
	category: "Info",
	breadcrumb: "About Us",
	title: "About Us",
	options : [],
	votes: [],
	comments: ""
	}
];


ReactDOM.render(
	<App questions={QUESTIONS} />,
	document.getElementById('app')
);