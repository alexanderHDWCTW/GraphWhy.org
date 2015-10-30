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
			<Drawer changeCenter={this.changeCenter}
						  questions={this.props.questions}
						  visitor={this.props.visitor} />
			<Center activeQuestion={this.state.activeQuestion}
						  questions={this.props.questions} />
		</div>
		);
	}
});
var Drawer = React.createClass({

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
													  						id={this.props.questions[i].id}
													  						title={this.props.questions[i].title} />); 
		}
		var visitorTitles = [];
		for (var i = 0; i < this.props.visitor.length; i++) {
			visitorTitles.push(<ProfileLink changeCenter={this.props.changeCenter}
																		  title={this.props.visitor[i].title} />); 
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
					<SigninButton />
					<LoginButton />
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
				<Header activeQuestion={this.props.activeQuestion}
								questions={this.props.questions} visitor={this.props.visitor} />
				<Main activeQuestion={this.props.activeQuestion}
							questions={this.props.questions} visitor={this.props.visitor} />
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
				<Question activeQuestion={this.props.activeQuestion}
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
		var tempstate = this.state;
		tempstate.questions[this.props.activeQuestion].votes[
		this.props.questions[

		this.props.activeQuestion].options.length-
		$('input[name=radioName]:checked', '#myForm').val()-1

		]++;
		this.setState(tempstate);
	
	},
	render: function() {
		var activeQuestion = this.props.activeQuestion;
		return(
			<div className="mui-col-xs-12 mui-col-sm-10 mui-col-sm-offset-1"><br/><br/>
				<h1> {this.props.questions[activeQuestion].title} </h1>
				<VoteField activeQuestion={this.props.activeQuestion}
									 questions={this.props.questions} func={this.incrementVote}/>
				<Data activeQuestion={this.props.activeQuestion}
							questions={this.state.questions}/>
				<Comments activeQuestion={this.props.activeQuestion}
								  questions={this.props.questions}/>
			</div>
		);
	}
});
var VoteField = React.createClass({
<<<<<<< HEAD
	/*incrementVote: function(){
	
		//alert($('input[name=radioName]:checked', '#myForm').val()); 
		this.props.questions[this.props.activeQuestion].votes[0]++;
		
	},*/
=======

>>>>>>> 0dfb332ed37b566956086e98ee5f83551bf86893
	render: function(){
		var activeQuestion = this.props.activeQuestion;
		var	options = [];
		for (var i=0; i < this.props.questions[activeQuestion].options.length; i++){
			options.push(<RadioOption options={this.props.questions[activeQuestion].options[i]} index={i}/> );
		}
		return(
			<div className="box">
					<form id="myForm">
						{options}
					</form>
					<hr/>
					<span className='mui--pull-right'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				  <button className="mui-btn mui-btn--small mui-btn--primary mui--pull-right" onClick={this.props.func}>Submit</button>
				  <div className="mui--clearfix"></div>
			</div>
		);
	}
});
var RadioOption = React.createClass({
	render: function() {
		return(
			<div className="mui-checkbox">
				<label>
					<div className='mui--pull-left optionBox'>
						<input value={this.props.index} name="radioName" type="radio"/>
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
		var activeQuestion =  this.props.activeQuestion;
		var data = [];
		for (var i=0; i < this.props.questions[activeQuestion].votes.length; i++){
			data.push(this.props.questions[activeQuestion].votes[i]);
			var x = 0;
			if (i > 0) {
				x = i * 18;
			}
		}
		console.log(data)
		return(
			<div className='box graph'>
				<div className='labelTEMP'>
					<span>A</span>
					<span>B</span>
					<span>C</span>
					<span>D</span>
					<span>E</span>
				</div>
				<div className='centerSVG'>
				<Chart className='centerSVG' width='300px' height='200px'>
					<DataSeries data={data}
									//	  questions={this.props.questions}
									//	  activeQuestion={this.props.activeQuestion}
										  width='300' height='200' color="#3F51B5" /> 
				</Chart>
				</div>
				<div className='tallyTEMP extraTOP'>
					{this.props.questions[activeQuestion].votes[4]} votes
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.props.questions[activeQuestion].votes[3] } votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.props.questions[activeQuestion].votes[2]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.props.questions[activeQuestion].votes[1]} votes</span>
				</div>
				<div className='tallyTEMP'>
					<span className='inlineSPAN'>{this.props.questions[activeQuestion].votes[0]} votes</span>
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
      .range([0, 100]);
    var yScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.height], 0.05);

     console.log(this.props.data);

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
		return(
			<div className="box">
				<div>
					<h4 className="mui--pull-left"><b>5</b>&nbsp;- {this.props.questions[activeQuestion].comments[0].name}</h4>
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
});


var SigninButton =  React.createClass({
	getInitialState: function() {
		return { showSignin: false};
	},
	onClick: function() {
		this.setState({showSignin: !this.state.showSignin});
	},
	render: function() {
		return (
			<div>
			<li className='category' onClick={this.onClick} ><b>Signin</b></li>
			{ this.state.showSignin ? <Signup /> : null }
			</div>
		);
	}
});
var LoginButton =  React.createClass({
	getInitialState: function() {
		return { showLogin: false};
	},
	onClick: function() {
		this.setState({showLogin: !this.state.showLogin});
	},
	render: function() {
		return (
			<div>
			<li className='category' onClick={this.onClick} ><b>Login</b></li>
			{ this.state.showLogin ? <Login /> : null }
			</div>
		);
	}
});

var Login = React.createClass({
	render: function() {
		return(
			<div className="box">
				<form name="login">
					<ul className='signin'>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="text" />
								<label>Username/Email</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="password" />
								<label>Password</label>
							</div>
						</li>
					</ul>
				<div className="signin-social">
					<br/>
					<div className='mui-col-xs-6'>
					<span>Use:</span>
					<img className="standard-img" src="client/img/signin-facebook.png" />
					<img className="standard-img" src="client/img/signin-google.png" />
					</div>
					<div className='mui-col-xs-6'>
						<button className="mui-btn mui-btn--small mui-btn--primary mui--pull-right">Submit</button>
					</div>
					<br/>
					<br/>
					<br/>
				</div>
				<br/>
				</form>
			</div>
		);
	} 
});

var Signup = React.createClass({
	render: function() {
		return(
			<div className="box">
				<form name="login">
					<ul className='signin'>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="text" />
								<label>Email</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="text" />
								<label>Username</label>
							</div>
						</li>
						<li>
							<div className="mui-textfield mui-textfield--float-label">
								<input type="password" />
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
					<span>Use:</span>
					<img className="standard-img" src="client/img/signin-facebook.png" />
					<img className="standard-img" src="client/img/signin-google.png" />
					</div>
					<div className='mui-col-xs-6'>
						<button className="mui-btn mui-btn--small mui-btn--primary mui--pull-right">Submit</button>
					</div>
					<br/>
					<br/>
					<br/>
				</div>
				<br/>
				</form>
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
		title		: "How important is the paying off the federal debt?",
		options :	[
								" A - USA's #1 Priority",
								" B - USA's #2 Priority",
								" C - USA's top 5 priorities",
								" D - USA's top 10 priorities",
								" E - None of the above"
							],
		votes 	: [
								"5",   //E
								"6",   //D
								"9",   //C
								"10",  //B
								"1"    //A
							],
		comments: [	
								{
									vote:"A",
									name:"John Cena",
									title:"Challenger: District 12, SF",
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
								" A - Yes, absolutly!",
								" B - Yes",
								" C - Neutral",
								" D - No",
								" E - No, absolutly not!"
							],
		votes 	: [
								"5",   //E
								"2",   //D
								"8",   //C
								"11",  //B
								"9"    //A
							],
		comments: [	
								{
									vote:"C",
									name:"Preston Picus",
									title:"Challenger: District 12, SF",
									date:"10/24/2015",
									comment:"Et sea quas erroribus. Nemore utamur an vim. Legendos gloriatur qui ei, cu verear urbanitas vix. An sint viris fastidii vis, appareat inimicus volutpat ea ius. Eam ei erant docendi vivendum. Feugiat accusamus interpretaris ei mei, ea dico qualisque intellegebat qui. An quo lorem fugit, assum laudem vidisse nam eu. Mel quas mandamus efficiantur ne, cu cum sumo nulla tempor, ea duo partem volutpat gubergren. Per nibh vidit percipitur eu. Eam tempor blandit delicatissimi an. Te vidit rebum pro, his altera causae cu, sea ea novum mundi epicurei. In pri erant convenire, everti abhorreant his in, qui at augue ridens similique. Altera mnesarchum has cu, cum ad paulo bonorum. Ut vix discere omnesque. Cu eos nulla erant audire, ut affert graeco nominati nec. Quo et legere nostro inciderint, in appetere principes vel, ut mel quem vivendum instructior. Vulputate argumentum ne qui, eum nobis eleifend an, ex sale solum sit. Soluta nominavi contentiones et mei, iriure consetetur eu sit, delenit molestie vel eu. Nostrud insolens in mea, nobis minimum officiis eum ne. Mel at everti debitis incorrupte, an has quot malis error, eos et tale adhuc voluptatibus. An appetere corrumpit scribentur nam. Et nam petentium interesset, ius ex error paulo putant. Nam autem equidem disputationi et, sed id persius debitis tibique, mei ex adipisci electram. Vix in tota harum laudem, vim no omnium civibus. Ea mea novum suavitate, nec odio similique et."
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
