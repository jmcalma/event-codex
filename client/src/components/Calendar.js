import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class Calendar extends Component {
  constructor() {
    super(); 

    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );

    this.state = {
      events: []
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


  render() {
    return (
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
          onSelectEvent={event => alert(event.location)}
          defaultDate={new Date()}
        />
      </div>
    )
  }
}

export default Calendar;
