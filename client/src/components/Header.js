import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';
import {blue500} from 'material-ui/styles/colors';

const customContentStyle = {

};

class Header extends Component {
  state = {
    open: false,
    value: 1,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => this.setState({value});

  addEvent = () => {
    this.setState({open: false}); //disable if debugging
    var contactEmail = document.getElementById('input_email').value;
    var eventTitle = document.getElementById('input_event_title').value;
    var eventLocation = document.getElementById('input_event_location').value;
    var eventStartDate = document.getElementById('input_event_startdate').value;
    var eventStartTime = document.getElementById('input_event_starttime').value;
    var eventEndDate = document.getElementById('input_event_enddate').value;
    var eventEndTime = document.getElementById('input_event_endtime').value;
    var eventCategory = document.getElementById('select_event_category').value;
    var website = document.getElementById('input_website').value;
    var eventDescription = document.getElementById('input_event_description').value;
    var eventTags = document.getElementById('input_event_tags').value;

    // $.ajax(
    //         {
    //             type : "POST",
    //             url  : "/api/event"+ eventTitleUrl,
    //             data : {
    //                 "email" : contactEmail,
    //                 "title" : eventTitle,
    //                 "location" : eventLocation,
    //                 "start date" : eventStartDate,
    //                 "start time" : eventStartTime,
    //                 "end date" : eventEndDate,
    //                 "end time" : eventEndTime,
    //                 "category" : eventCategory,
    //                 "website" : website,
    //                 "description" : eventDescription,
    //                 "tags" : eventTags,
    //                 "url" : eventTitleUrl
    //             },
    //         });

      //var form = document.querySelector('form')

      fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify({
                    email : contactEmail,
                    title : eventTitle,
                    location : eventLocation,
                    start_date : eventStartDate,
                    start_time : eventStartTime,
                    end_date : eventEndDate,
                    end_time : eventEndTime,
                    category : eventCategory,
                    website : website,
                    description : eventDescription,
                    tags : eventTags,
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response) {
        return response.json()
      })
     }

     
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.addEvent}
      />,
    ];

    return (
      <nav className="blue darken-2">
        <div className="nav-wrapper">
          <a className="brand-logo center">Event Codex</a>
          <ul className="right">
            <MuiThemeProvider>
               <div>
                <RaisedButton label="Add Event" onClick={this.handleOpen} />

                <Dialog
                  title="Event Form"
                  actions={actions}
                  modal={false}
                  contentStyle={customContentStyle}
                  autoScrollBodyContent={true}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                 <form id="form" method="post">
                  <div>
                    <TextField
                      floatingLabelText="Contact email"
                      id="input_email"
                    /><br />
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Event Title"
                      id="input_event_title"
                    /><br />
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Location"
                      id="input_event_location"
                    /><br />
                  </div>

                 <div id="start">
                   <div>
                    <DatePicker hintText="Start Date" container="inline" mode="landscape" id="input_event_startdate"/>
                   </div>

                    <div>
                      <TimePicker
                        format="ampm"
                        hintText="Start Time"
                        id="input_event_starttime"
                        value={this.state.value12}
                        onChange={this.handleChangeTimePicker12}
                      />
                    </div>
                  </div>

                  <div id="end">
                    <div>
                       <DatePicker hintText="End Date" container="inline" mode="landscape" id="input_event_enddate"/>
                    </div>

                    <div>
                      <TimePicker
                        format="ampm"
                        hintText="End Time"
                        id="input_event_endtime"
                        value={this.state.value12}
                        onChange={this.handleChangeTimePicker12}
                      />
                    </div>
                  </div>

                   <div>
                    <SelectField
                      floatingLabelText="Category"
                      value={this.state.value}
                      id="select_event_category"
                      onChange={this.handleChange}
                      selectedMenuItemStyle={{ color: '#00B8D4' }}
                    >
                      <MenuItem value={1} primaryText="option1" />
                      <MenuItem value={2} primaryText="option2" />
                      <MenuItem value={3} primaryText="option3" />
                      <MenuItem value={4} primaryText="option4" />
                      <MenuItem value={5} primaryText="Technology" />
                    </SelectField>
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Website (optional)"
                      id="input_website"
                    /><br />
                  </div>

                  <div>
                   <TextField
                      hintText="Message Field"
                      floatingLabelText="Event Description"
                      id="input_event_description"
                      multiLine={true}
                      rows={2}
                    /><br />
                 </div>

                 <div>
                   <TextField
                      hintText="Message Field"
                      id="input_event_tags"
                      floatingLabelText="Tags"
                      multiLine={true}
                      rows={2}
                    /><br />
                  </div>
                </form>
                </Dialog>
              </div>
            </MuiThemeProvider>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
