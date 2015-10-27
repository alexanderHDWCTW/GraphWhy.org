var store = {
	activeQuestion: 0
};
var App = React.createClass({
	getInitialState: function() {
		return store;
	},

	changeCenter: function(id) {
		store.activeQuestion = id;
		this.setState(store);
	},

	render: function() {
		return(
		<div>
			<Drawer changeCenter={this.changeCenter} questions={this.props.questions} visitor={this.props.visitor} />
			<Center activeQuestion={this.state.activeQuestion} questions={this.props.questions} />
		</div>
		);
	}
});
var Drawer = React.createClass({

	render: function() {
		var questionTitles = [];
		for (var i=0; i < this.props.questions.length; i++) {
			questionTitles.push(<QuestionLink changeCenter={this.props.changeCenter} id={this.props.questions[i].id} title={this.props.questions[i].title} />); 
		}
		var visitorTitles = [];
		for (var i = 0; i < this.props.visitor.length; i++) {
			visitorTitles.push(<ProfileLink changeCenter={this.props.changeCenter} title={this.props.visitor[i].title} />); 
		}
		return(
			<div className="fixed drawer mui--hidden-xs mui-col-sm-3 mui-col-lg-2">
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
					<li className='category'><b>Questions</b></li>
					<ul className='sub'>
						{questionTitles}
					</ul>
					<li className='category'><b>Profile</b></li>
					<ul className='sub'>
						{visitorTitles}
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
		return(
			<li onClick={ this.handleClick(this.props.id) }>{this.props.title}</li>
		);
	}	
});
var ProfileLink = React.createClass({
	render: function() {
		return(
			<li>{this.props.title}</li>
		);
	}
});
var Center = React.createClass({
	// this.props.activeQuestion
	render: function() {
		console.log(this.props.questions);
		return(
			<div className="center mui-col-xs-12 mui-col-sm-9 mui-col-lg-10">
				<Header activeQuestion={this.props.activeQuestion} questions={this.props.questions} visitor={this.props.visitor} />
				<Main activeQuestion={this.props.activeQuestion} questions={this.props.questions} visitor={this.props.visitor} />
			</div>
		);
	}
});
var Header = React.createClass({
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		//is there a way to read the route in jsx?
		return(
			<header className="fixed header">
 				<h3>{this.props.questions[activeQuestion].category} > {this.props.questions[activeQuestion].breadcrumb}</h3>
			</header>
		);
	}
});
var Main = React.createClass({
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		return(
			<div className="main mui-row"><br/>
				<Question activeQuestion={this.props.activeQuestion} questions={this.props.questions} />
				<Signup />
				<Login />
			</div>
		);
	}
});


var Question = React.createClass({
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		return(
			<div className="mui-col-xs-12 mui-col-sm-10 mui-col-sm-offset-1"><br/><br/>
				<h1> {this.props.questions[activeQuestion].title} </h1>
				<VoteField activeQuestion={this.props.activeQuestion} questions={this.props.questions}/>
				<Data activeQuestion={this.props.activeQuestion} questions={this.props.questions}/>
				<Comments activeQuestion={this.props.activeQuestion} questions={this.props.questions}/>
			</div>
		);
	}
});

var VoteField = React.createClass({
	render: function(){
		var activeQuestion = this.props.activeQuestion;
		var	options = [];
		for (var i=0; i < this.props.questions[activeQuestion].options.length; i++){
			options.push(<RadioOption options={this.props.questions[activeQuestion].options[i]} /> );
		}
		return(
			<div className="box">
				<form name="vote-field">
					{options}
					<hr/>
					<span className='mui--pull-right'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				  <button className="mui-btn mui-btn--small mui-btn--primary mui--pull-right">Submit</button>
				  <div className="mui--clearfix"></div>
				</form> 
			</div>
		);
	}
});

var RadioOption = React.createClass({
	render: function() {
		return(
			<div className="mui-checkbox">
				<label >
					<div className='mui--pull-left optionBox'>
						<input name='one' type="radio"/>
						<div className='mui--pull-right optionText'>
							{this.props.options}
						</div>
					</div>
				</label>
			</div>
		);
	}
});


var Data = React.createClass({
	render: function(){
		return(
			<div className="box">
				<div className="SVG">
				</div>
			</div>
		);
	}
}); 

var Comments = React.createClass({
	render: function(){
		return(
			<div className="box">
				<div>
					<h4 className="mui--pull-left"><b>5</b>&nbsp;- Preston Picus</h4>
					<h4 className="mui--pull-right">10/24/2015</h4>
					<div className="mui--clearfix"></div>
				</div>
				<br/>
				<div className="mui--text-black-87 mui--text-body1">
					Lorem ipsum dolor sit amet, in quando saperet rationibus usu, ex duo mundi evertitur. Et sea quas erroribus. Idque latine lucilius at vim, per numquam aliquando et. Nemore utamur an vim.
					Legendos gloriatur qui ei, cu verear urbanitas vix. Nostro iisque nominavi ut mea. An sint viris fastidii vis, appareat inimicus volutpat ea ius. Eam ei erant docendi vivendum. Feugiat accusamus interpretaris ei mei, ea dico qualisque intellegebat qui.
					An quo lorem fugit, assum laudem vidisse nam eu. Mel quas mandamus efficiantur ne, cu cum sumo nulla tempor, ea duo partem volutpat gubergren. Per nibh vidit percipitur eu. Eam tempor blandit delicatissimi an. Te vidit rebum pro, his altera causae cu, sea ea novum mundi epicurei. In pri erant convenire, everti abhorreant his in, qui at augue ridens similique.
					Altera mnesarchum has cu, cum ad paulo bonorum. Ut vix discere omnesque. Cu eos nulla erant audire, ut affert graeco nominati nec. Quo et legere nostro inciderint, in appetere principes vel, ut mel quem vivendum instructior. Vulputate argumentum ne qui, eum nobis eleifend an, ex sale solum sit. Soluta nominavi contentiones et mei, iriure consetetur eu sit, delenit molestie vel eu.
					Nostrud insolens in mea, nobis minimum officiis eum ne. Mel at everti debitis incorrupte, an has quot malis error, eos et tale adhuc voluptatibus. An appetere corrumpit scribentur nam. Et nam petentium interesset, ius ex error paulo putant. Nam autem equidem disputationi et, sed id persius debitis tibique, mei ex adipisci electram. Vix in tota harum laudem, vim no omnium civibus. Ea mea novum suavitate, nec odio similique et.
				</div>
			</div>
		);
	}
});

var Login = React.createClass({
	render: function() {
		return(
			<div className="mui-col-xs-12 mui-col-sm-6 mui-col-sm-offset-3">
				<br/>
				<br/>
				<h1>Login</h1>
				<div className="box">
					<br/>
					<form name="login">
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Username/Email</label>
						</div>
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Password</label>
						</div>
						<div className="signin-social">
							<br/>
							<img className="standard-img" src="client/img/signin-facebook.png" />
							<img className="standard-img" src="client/img/signin-google.png" />
							<br/>
						</div>
					</form>
				</div>
			</div>
		);
	} 
});

var Signup = React.createClass({
	render: function() {
		return(
			<div className="mui-col-xs-12 mui-col-sm-6 mui-col-sm-offset-3">
				<br/>
				<br/>
				<h1>Sign Up</h1>
				<div className="box">
					<br/>
					<form name="login">
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Email</label>
						</div>
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Username</label>
						</div>
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Password</label>
						</div>
						<div className="mui-textfield mui-textfield--float-label">
							<input type="text" />
							<label>Confirm Password</label>
						</div>
						<div className="signin-social">
							<br/>
							<img className="standard-img" src="client/img/signin-facebook.png" />
							<img className="standard-img" src="client/img/signin-google.png" />
							<br/>
						</div>
					</form>
				</div>
			</div>
		);
	} 
});

var QUESTIONS = [
	{
		id: 0,
		route:["FederalDebt", "/"],
		category: "Question",
		breadcrumb: "Federal Debt",
		title		: "How important is the US federal debt?",
		options :	[
								" 1 - We should not be concerned about our federal debt",
								" 2 - There are more important things to work on.",
								" 3 - Yes, it is important.",
								" 4 - This is a very important issue for the USA.",
								" 5 - This is the most important issue the USA."
							],
		votes 	: [
								"5",
								"10",
								"9",
								"11",
								"34"
							],
		comments: [	
								{
									vote:"4",
									name:"Preston Picus",
									date:"10/24/2015",
									comment:"Lorem ipsum dolor sit amet, in quando saperet rationibus usu, ex duo mundi evertitur. Et sea quas erroribus. Idque latine lucilius at vim, per numquam aliquando et. Nemore utamur an vim. Legendos gloriatur qui ei, cu verear urbanitas vix. Nostro iisque nominavi ut mea. An sint viris fastidii vis, appareat inimicus volutpat ea ius. Eam ei erant docendi vivendum. Feugiat accusamus interpretaris ei mei, ea dico qualisque intellegebat qui. An quo lorem fugit, assum laudem vidisse nam eu. Mel quas mandamus efficiantur ne, cu cum sumo nulla tempor, ea duo partem volutpat gubergren. Per nibh vidit percipitur eu. Eam tempor blandit delicatissimi an. Te vidit rebum pro, his altera causae cu, sea ea novum mundi epicurei. In pri erant convenire, everti abhorreant his in, qui at augue ridens similique. Altera mnesarchum has cu, cum ad paulo bonorum. Ut vix discere omnesque. Cu eos nulla erant audire, ut affert graeco nominati nec. Quo et legere nostro inciderint, in appetere principes vel, ut mel quem vivendum instructior. Vulputate argumentum ne qui, eum nobis eleifend an, ex sale solum sit. Soluta nominavi contentiones et mei, iriure consetetur eu sit, delenit molestie vel eu. Nostrud insolens in mea, nobis minimum officiis eum ne. Mel at everti debitis incorrupte, an has quot malis error, eos et tale adhuc voluptatibus. An appetere corrumpit scribentur nam. Et nam petentium interesset, ius ex error paulo putant. Nam autem equidem disputationi et, sed id persius debitis tibique, mei ex adipisci electram. Vix in tota harum laudem, vim no omnium civibus. Ea mea novum suavitate, nec odio similique et."
								}
							],
		active: true
	},
	{
		id: 1,
		route:"DrugLaw",
		category: "Question",
		breadcrumb: "Drug Law",
		title		: "Should we legalize all drugs?",
		options :	[
								" 1 - No, absolutly not!",
								" 2 - No",
								" 3 - Neutral",
								" 4 - Yes",
								" 5 - Yes, absolutly!"
							],
		votes 	: [
								"5",
								"2",
								"26",
								"11",
								"34"
							],
		comments: [	
								{
									vote:"4",
									name:"Preston Picus",
									date:"10/24/2015",
									comment:"Lorem ipsum dolor sit amet, in quando saperet rationibus usu, ex duo mundi evertitur. Et sea quas erroribus. Idque latine lucilius at vim, per numquam aliquando et. Nemore utamur an vim. Legendos gloriatur qui ei, cu verear urbanitas vix. Nostro iisque nominavi ut mea. An sint viris fastidii vis, appareat inimicus volutpat ea ius. Eam ei erant docendi vivendum. Feugiat accusamus interpretaris ei mei, ea dico qualisque intellegebat qui. An quo lorem fugit, assum laudem vidisse nam eu. Mel quas mandamus efficiantur ne, cu cum sumo nulla tempor, ea duo partem volutpat gubergren. Per nibh vidit percipitur eu. Eam tempor blandit delicatissimi an. Te vidit rebum pro, his altera causae cu, sea ea novum mundi epicurei. In pri erant convenire, everti abhorreant his in, qui at augue ridens similique. Altera mnesarchum has cu, cum ad paulo bonorum. Ut vix discere omnesque. Cu eos nulla erant audire, ut affert graeco nominati nec. Quo et legere nostro inciderint, in appetere principes vel, ut mel quem vivendum instructior. Vulputate argumentum ne qui, eum nobis eleifend an, ex sale solum sit. Soluta nominavi contentiones et mei, iriure consetetur eu sit, delenit molestie vel eu. Nostrud insolens in mea, nobis minimum officiis eum ne. Mel at everti debitis incorrupte, an has quot malis error, eos et tale adhuc voluptatibus. An appetere corrumpit scribentur nam. Et nam petentium interesset, ius ex error paulo putant. Nam autem equidem disputationi et, sed id persius debitis tibique, mei ex adipisci electram. Vix in tota harum laudem, vim no omnium civibus. Ea mea novum suavitate, nec odio similique et."
								}
							],
		active: false
	}];
var VISITOR= [
	{
		category: "Profile",
		breadcrumb: "Login",
		title: "Login",
		forms: [
						'Username / Email',
						'Password'
						],
		active: false
	},
	{
		category: "Profile",
		breadcrumb: "Sign Up",
		title: "Sign In",
		forms: [
						'Email',
						'Username',
						'Password',
						'Confirm Password'
						],
		active: false
	}
];


ReactDOM.render(
	<App questions={QUESTIONS} visitor={VISITOR} />,
	document.getElementById('app')
);
