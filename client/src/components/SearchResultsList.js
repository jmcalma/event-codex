import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FileSaver from 'file-saver';

class SearchResultsList extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		events: [],
  		eventsLength: 0,
      buttonState: false,
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

  downloadIcs = (event) => {
    if (this.state.buttonState === false) {
      var newState = true;
      this.setState({ buttonState: newState });
    } else {
        if(event.hasOwnProperty('group')) {
            fetch("/api/meetupEvents/downloadics/" + event._id)
              .then((response) => {
                  return response.blob() })
              .then((blob) => {
                   FileSaver.saveAs(blob, event.event_name + ".ics");
            });
        } else {
            fetch("/api/event/downloadics/" + event._id)
              .then((response) => {
                  return response.blob() })
              .then((blob) => {
                   FileSaver.saveAs(blob, event.event_name + ".ics");
            });
        }
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
				      title={<h6 className="blue-text"><b>{this.state.events[i].event_name}</b></h6>}
				      subtitle={this.convertDateTime(this.state.events[i].start_date, this.state.events[i].end_date)}
				      actAsExpander={true}
	      			  showExpandableButton={true}
				    />
				    <CardText expandable={true}>
              <h6 className="blue-text">Category</h6>
				      <p>{this.state.events[i].event_category}</p>
              <h6 className="blue-text">Where</h6>
				      <p>{this.state.events[i].location}</p>
              <h6 className="blue-text">Descripton</h6>
              <div dangerouslySetInnerHTML={{__html:this.state.events[i].event_description}}></div>
				    </CardText>
				    <CardActions>
				      <RaisedButton secondary={true} label="Download ICS" onClick={() => this.downloadIcs(this.state.events[i])} />
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
