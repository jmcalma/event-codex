import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar'
import FileSaver from 'file-saver';
import MiniMap from './MiniMap';

import eventsTest from './events';

const titleStyles = {
    fontSize: '40px',
    padding: '15px 0px 20px 21px',
};

const styles = {
  dialogRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0
  },
  dialogContent: {
    position: "relative",
    width: "80vw",

  },
  dialogBody: {
    paddingBottom: 0
  }
};

class Calendar extends Component {
  constructor() {
    super(); 

    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );

    this.state = {
      events: [],
      eventsMeetup: [],
      currentEvent: "ffff",
      eventDetailsOpen: false,
      snackbarOpen: false,
    };
  };

  componentDidMount() {
      fetch("/api/event")
        .then((response) => {
            return response.json() })   
        .then((json) => {
            this.setState({ events: json });
      });

      // fetch("/api/meetupEvents")
      //   .then((response) => {
      //       return response.json() })   
      //   .then((json) => {
      //       this.setState({ eventsMeetup: json });
      // });
  };

  handleOpenEvent = (event) => {
      this.setState({ eventDetailsOpen: true});
      this.setState({ currentEvent: event });
  };

  handleClose = () => {
      this.setState({ eventDetailsOpen: false });
  };

  downloadIcs = () => {
    this.setState({ snackbarOpen: true });
    fetch("/api/event/downloadics/" + this.state.currentEvent._id)
      .then((response) => {
          return response.blob() })   
      .then((blob) => {
           FileSaver.saveAs(blob, this.state.currentEvent.event_name + ".ics");
     });
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

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false});
  };

  checkMeetup = (event, type) => {
    switch(type) {
      case 0:
        if (event.hasOwnProperty('group')) {
          return "Meetup Link: " + event.link;
        }
        break;
      case 1:
        if(event.hasOwnProperty('group')) {
          return event.group.location;
        }
        break;
      case 2:
        return event.description;
      case 3:
        break;
      case 4:
        if(event.hasOwnProperty('group')) {
          return event.group.name;
        } else {
          return event.event_name;
        }
      case 5:
        if(event.hasOwnProperty('group')) {
          return "from Meetup";
        }
        break;
      default:
        break;
    }
  }

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
            events={eventsTest.concat(this.state.events)}
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
            <div id="calendarEvent">
              <Dialog
                title={this.checkMeetup(this.state.currentEvent, 4)}
                actions={actions}
                autoDetectWindowHeight={true}
                repositionOnUpdate={false}
                modal={false}
                open={this.state.eventDetailsOpen}
                onRequestClose={this.handleClose}
                titleStyle={titleStyles}
                autoScrollBodyContent={true}
                contentStyle={ styles.dialogContent }
                bodyStyle={ styles.dialogBody }
                style={ styles.dialogRoot }
              >
                <div id="eventDetails">
                  <div>
                    <h6> Contact Email: {this.state.currentEvent.host_email} </h6>
                    <h6> {this.checkMeetup(this.state.currentEvent, 0)} </h6>
                  </div>
                  <div id="miniSpace"> </div>
                  <div>
                    <h6> When: {this.convertDateTime(this.state.currentEvent.start_date, this.state.currentEvent.end_date)} </h6>
                  </div>
                  <div>
                    <h6> Where: {this.state.currentEvent.location} {this.checkMeetup(this.state.currentEvent, 1)} </h6>
                  </div>
                  
                  <div id="miniSpace"> </div>
                  <div>
                    <h6> Description: {this.state.currentEvent.event_description} {this.checkMeetup(this.state.currentEvent, 2)} </h6>
                  </div>
                  <div>
                    <h6> Category: {this.state.currentEvent.event_category} {this.checkMeetup(this.state.currentEvent, 3)} </h6>
                  </div>

                  <div>
                    <MiniMap isMarkerShown={false} event={this.state.currentEvent} /> 
                  </div>

                  <div id="apiMarker">
                    <p> {this.checkMeetup(this.state.currentEvent, 5)} </p>
                  </div>

                  <div id="downloadIcs">
                    <RaisedButton id="btnDownloadIcs" label="Download Event ICS" onClick={this.downloadIcs} />
                  </div>

                  <div id="space"></div> <div id="space"></div>
                </div>
                
              </Dialog>
            </div>
              <Snackbar
                open={this.state.snackbarOpen}
                message="Event ICS downloading"
                autoHideDuration={3000}
                onRequestClose={this.handleSnackbarClose}
              />
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default Calendar;
