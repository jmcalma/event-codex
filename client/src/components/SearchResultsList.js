import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class SearchResultsList extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		events: [],
  		eventsLength: 0,
  	};
  }

  componentDidMount() {
  	 var count = Object.keys(this.props.events).length;
  	 this.setState({ events: this.props.events });
  	 this.setState({ eventsLength: count });
  	 console.log(this.props.events);
  };

  renderListRow = () => {
  	return (
  		<div id="searchResultsRow">
  			<div id="card1">
  			  <Card>
			    <CardHeader
			      title="1"
			      subtitle="Subtitle"
			    />
			    <CardActions>
			      <FlatButton label="Action1" />
			      <FlatButton label="Action2" />
			    </CardActions>
			  </Card>
			</div>

			<div id="card2">
  			  <Card>
			    <CardHeader
			      title="2"
			      subtitle="Subtitle"
			    />
			    <CardActions>
			      <FlatButton label="Action1" />
			      <FlatButton label="Action2" />
			    </CardActions>
			  </Card>
			</div>
  		</div>
  	);
  }

  renderRows = () => {
	 for(var i = 0; i < 3; i++) {
	 	return this.renderListRow();
	 }
  }

  render() {
	return(
		<div>
			{this.renderListRow()}
			{this.renderListRow()}
			{this.renderRows()}

		</div>
	);
  }
}

export default SearchResultsList;