import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import FileSaver from 'file-saver';

class SearchResultsList extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		events: [],
  		eventsLength: 0,
      count: 0,
  	};
  }

  componentDidMount() {
  	 var count = Object.keys(this.props.events).length;
  	 this.setState({ events: this.props.events });
  	 this.setState({ eventsLength: count });
  };

  convert24HourTo12Hour = (hours, minutes) => {
    if (hours > 12) {
      return (hours - 12) + ":" + this.addZeroToMinute(minutes) + " PM";
    } else {
      return hours + ":" + this.addZeroToMinute(minutes) + " AM";
    }
  }

  addZeroToMinute = (minutes) => {
    if (minutes < 10) {
      return "0" + minutes;
    } else {
      return minutes;
    }
  }

  convertDateTime = (start_date, end_date) => {
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepetember", "October", "November", "December"];
      var convertedStartDate = new Date(start_date);
      var convertedEndDate = new Date(end_date);

      var startMonth = convertedStartDate.getMonth();
      var startDay = convertedStartDate.getDate();
      var startYear = convertedStartDate.getFullYear();
      var startHour = convertedStartDate.getUTCHours();
      var startMin = convertedStartDate.getMinutes();
      var convStartTime = this.convert24HourTo12Hour(startHour, startMin);

      var endMonth = convertedEndDate.getMonth();
      var endDay = convertedEndDate.getDate();
      var endYear = convertedEndDate.getFullYear();
      var endHour = convertedEndDate.getUTCHours();
      var endMin = convertedEndDate.getMinutes();
      var convEndTime = this.convert24HourTo12Hour(endHour, endMin);

      if (startDay !== endDay) {
          return days[convertedStartDate.getDay()] + ", " + months[startMonth] + " " + startDay + ", " + startYear + " at " + convStartTime + " to "
           + days[convertedEndDate.getDay()] + ", " + months[endMonth] + " " + endDay + ", " + endYear  + " at " + convEndTime;
       } else {
          return days[convertedStartDate.getDay()] + ", " + months[startMonth] + " " + startDay + ", " + startYear + " at " + convStartTime + " to "
            + convEndTime;
       }
  };

  componentWillMount = () => {
  	this.downloadIcs();
  }

  downloadIcs = (eventId) => {
    if (this.state.count === 0) {
      var newCount = 1;
      this.setState({ count: newCount });
    } else {
      console.log("/api/event/downloadics/" + eventId);
      fetch("/api/event/downloadics/" + eventId)
        .then((response) => {
            return response.blob() })   
        .then((blob) => {
             FileSaver.saveAs(blob, eventId + ".ics");
       });
    }
  	

  }

  render() {
  	var cardSearchHolder = [];
  	for(let i = 0; i < this.state.eventsLength; i++) {
  		cardSearchHolder.push(
  			(
  			<div key={i}>
	  			<Card>
	  			   key={this.state.events[i]._id}
				    <CardHeader
				      title={this.state.events[i].event_name}
				      subtitle={this.convertDateTime(this.state.events[i].start_date, this.state.events[i].end_date)}
				      actAsExpander={true}
	      			  showExpandableButton={true}
				    />
				    <CardText expandable={true}>
				      <div>
				      	Category: {this.state.events[i].event_category}
				      </div>
				      <div>
				      	Where: {this.state.events[i].location}
				      </div>
				      <div id="miniSpace"></div>
				      <div>
				      	Description: {this.state.events[i].event_description}
				      </div>
				    </CardText>
				    <CardActions>
				      <FlatButton label="Download ICS" onClick={() => this.downloadIcs(this.state.events[i]._id)} />
				    </CardActions>
				  </Card>
				  <div id="space"></div>
			  </div>)
  		);
  	}
	return(
	  <div>
		 <MuiThemeProvider>
			<Card>
				{cardSearchHolder}
			</Card>
		  </MuiThemeProvider>
		  <div id="miniSpace"></div>
	   </div>
	);
  }
}

export default SearchResultsList;