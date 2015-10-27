var React = require('react');
var ReactDom = require('react-dom');

var Login = React.createClass({
	render: function() {
		return(
			<div className="profile-start">
				<input></input><label>hahahhahahahahhahhahaha</label>
			</div>
		);
	} 
});

ReactDOM.render(
	<Login />,
	document.getElementById('center')
);