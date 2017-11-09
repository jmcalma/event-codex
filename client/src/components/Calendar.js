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

    this.state = {
      event: []
    };
  };

   componentDidMount() {
      fetch("/api/event")
          .then((response) => {
              return response.json() })   
                  .then((json) => {
                      this.setState({ event: json });
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
          events={this.state.event}
          titleAccessor='location'
          startAccessor='start_date'
          endAccessor='end_date'
          views={allViews}
          step={60}
          onSelectEvent={event => alert(event.event_name)}
          defaultDate={new Date()}
        />
      </div>
    )
  }
}

export default Calendar;
