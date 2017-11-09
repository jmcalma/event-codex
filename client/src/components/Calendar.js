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
    //this.fetchEvents();
  };

   componentDidMount() {
      fetch("/api/event")
          .then((response) => {
              return response.json() })   
                  .then((json) => {
                      this.setState({ event: json });
                  });
  };


  fetchEvents = () => {
      fetch('/api/event')
      .then((resp) => resp.json())
      .then(function(response) {
        //console.log(response);
        //console.log(events);
        this.resp = response;
        this.setState({ event: response });
      })
      .catch(function(error) {
         console.log(error);
      });
  };

  render() {
    console.log(this.state.event);
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
