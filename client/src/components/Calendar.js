import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from '../events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
  constructor() {
    super(); 
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
    this.fetchEvents();
  }

  state = {
    event: []
  };

  fetchEvents = () => {
      fetch('/api/event')
      .then((resp) => resp.json())
      .then(function(response) {
        console.log("JSON " + response);
        this.setState({ events: response });
      })
      .catch(function(error) {
         console.log(error);
      });
  };

  render() {
    return (
      <div id="calendar">
        <BigCalendar
          selectable
          popup
          {...this.props}
          views={{ month: true, week: false}}
          events={events}
          // titleAccessor='event_name'
          // startAccessor='start_date'
          // endAccessor='end_date'
          views={allViews}
          step={60}
          onSelectEvent={event => alert(event.title)}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  }
}

export default Calendar;
