import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Calendar extends Component {
  constructor() {
    super(); 

    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );

    this.state = {
      events: [],
      currentEvent: "ffff",
      eventDetailsOpen: false,
    };
  };

  componentDidMount() {
      fetch("/api/event")
          .then((response) => {
              return response.json() })   
                  .then((json) => {
                      this.setState({ events: json });
                  });
  };

  handleOpenEvent = (event) => {
      this.setState({ eventDetailsOpen: true});
      this.setState({ currentEvent: event });
  };

  handleClose = () => {
      this.setState({ eventDetailsOpen: false });
  };

  downloadIcs = () => {
      console.log("download event");
  };

  convert24HourTo12Hour = (hours, minutes) => {
    if (hours > 12) {
      return (hours - 12) + ":" + minutes + " PM";
    } else {
      return hours + ":" + minutes + " AM";
    }
  }

  convertDateTime = (start_date, end_date) => {
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepetember", "October", "November", "December"];
      var convertedStartDate = new Date(start_date);
      var convertedEndDate = new Date(end_date);

      var startMonth = convertedStartDate.getMonth() + 1;
      var startDay = convertedStartDate.getDate() + 1;
      var startYear = convertedStartDate.getFullYear();
      var startHour = convertedStartDate.getHours() + 1;
      var startMin = convertedStartDate.getMinutes() + 1;
      var convStartTime = this.convert24HourTo12Hour(startHour, startMin);

      var endMonth = convertedEndDate.getMonth() + 1;
      var endDay = convertedEndDate.getDate() + 1;
      var endYear = convertedEndDate.getFullYear();
      var endHour = convertedEndDate.getHours() + 1;
      var endMin = convertedEndDate.getMinutes() + 1;
      var convEndTime = this.convert24HourTo12Hour(endHour, endMin);

      if (startDay != endDay) {
          return days[convertedStartDate.getDay()] + ", " + months[startMonth] + " " + startDay + ", " + startYear + " at " + convStartTime + " to "
           + days[convertedEndDate.getDay()] + ", " + months[endMonth] + " " + endDay + ", " + endYear  + " at " + convEndTime;
       } else {
          return days[convertedStartDate.getDay()] + ", " + months[startMonth] + " " + startDay + ", " + startYear + " at " + convStartTime + " to "
            + convEndTime;
       }
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <div id="calendar">
          <BigCalendar
            selectable
            popup
            {...this.props}
            views={['month']}
            defaultView='month'
            events={this.state.events}
            titleAccessor='event_name'
            startAccessor='start_date'
            endAccessor='end_date'
            step={60}
            onSelectEvent={event => this.handleOpenEvent(event)}
            defaultDate={new Date()}
          />
        </div>

        <div id="dialog">
          <MuiThemeProvider>
            <div>
              <Dialog
                title={this.state.currentEvent.event_name}
                actions={actions}
                modal={false}
                open={this.state.eventDetailsOpen}
                onRequestClose={this.handleClose}
              >
                <div id="eventDetails">
                  <div>
                    <h6> Contact Email: {this.state.currentEvent.host_email} </h6>
                  </div>
                  <div id="miniSpace"> </div>
                  <div>
                    <h6> Location: {this.state.currentEvent.location} </h6>
                  </div>
                  <div>
                    <h6> Duration: {this.convertDateTime(this.state.currentEvent.start_date, this.state.currentEvent.end_date)} </h6>
                  </div>
                  
                  <div id="miniSpace"> </div>
                  <div>
                    <h6> Category: {this.state.currentEvent.event_category} </h6>
                  </div>
                  <div>
                    <h6> Description: {this.state.currentEvent.event_description} </h6>
                  </div>

                </div>

                <RaisedButton id="btnDownloadIcs" label="Download Event ICS" onClick={this.downloadIcs} />
              </Dialog>
            </div>

          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default Calendar;
