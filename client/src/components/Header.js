import React, { Component } from "react";
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import SearchResultsList from './SearchResultsList';
import { Redirect } from 'react-router';
import 'whatwg-fetch';

import SearchIcon from './searchIcon.png';

const dialogFixStyles = {
  dialogRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 100
  },
  dialogContent: {
    position: "relative",
    width: "80vw",

  },
  dialogBody: {
    paddingBottom: 0
  }
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openEvents: false,
      selectorValue: 1,
      searchSelectorValue: 1,
      searchOpen: false,
      snackbarOpen: false,
      eventsSearch: [],
      meetupEventsSearch: [],
    };
  }

  redirectToHomePage = () => {
    window.location.assign('/');
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpenGetEvents = () => {
    this.setState({openEvents: true});
    this.fetchTest();
  };

  handleCloseGetEvents = () => {
    this.setState({openEvents: false});
  };

  handleChangeSelector = (event, index, selectorValue) => {
    this.setState({selectorValue});
  };

  addEvent = () => {
    var categories = [
      "Cars",
      "Careers",
      "Food",
      "Social",
      "Sports",
      "Technology",
      "Other",
    ];

    this.setState({ snackbarOpen: true });
    this.setState({ open: false });
    var contactEmail = document.getElementById('input_email').value;
    var eventTitle = document.getElementById('input_event_title').value;
    var eventLocation = document.getElementById('input_event_location').value;
    var eventStartDate = document.getElementById('input_event_startdate').value;
    var eventStartTime = document.getElementById('input_event_starttime').value;
    var eventEndDate = document.getElementById('input_event_enddate').value;
    var eventEndTime = document.getElementById('input_event_endtime').value;
    var website = document.getElementById('input_website').value;
    var eventDescription = document.getElementById('input_event_description').value;
    var eventTags = document.getElementById('input_event_tags').value;
    var eventCategoryIndex = this.state.selectorValue;
    var eventCategory = categories[eventCategoryIndex - 1];

    fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify({
                    host_email : contactEmail,
                    event_name : eventTitle,
                    location : eventLocation,
                    start_date : eventStartDate,
                    start_time : eventStartTime,
                    end_date : eventEndDate,
                    end_time : eventEndTime,
                    event_category : eventCategory,
                    event_description : eventDescription,
                    website_link : website,
                    tags : eventTags,
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response) {
        return response.json()
      })
  }

  validateForm = () => {
    if(this.formIsValid()) {
     this.addEvent();
     this.redirectToHomePage();
    } else {
      alert("One or more of the fields is incomplete or has errors.");
    }
  }

  formIsValid = () => {
    var contactEmail = document.getElementById('input_email').value;
    var eventTitle = document.getElementById('input_event_title').value;
    var eventLocation = document.getElementById('input_event_location').value;
    var eventStartDate = document.getElementById('input_event_startdate').value;
    var eventStartTime = document.getElementById('input_event_starttime').value;
    var website = document.getElementById('input_website').value;
    var eventDescription = document.getElementById('input_event_description').value;
    var eventTags = document.getElementById('input_event_tags').value;

    if (contactEmail === "" || eventTitle === "" || eventLocation === "" || eventStartDate === ""
        || eventStartTime === "" || eventDescription === "" || eventTags === "") {
        return false;
    }

    var emailRegExValidate = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(emailRegExValidate).test(contactEmail)) {
       return false;
    }

    //https://gist.github.com/dperini/729294
    var urlRegExValidate = /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if(website === "") {

    } else if (!(urlRegExValidate).test(website)) {
      return false;
    }

    return true;
  }

  handleOnChangeDatePicker = (event) => {
    var eventEndDate = document.getElementById('input_event_enddate').value;
    if(eventEndDate === "") {
      document.getElementById('input_event_enddate').value = event.getFullYear() + "-" + (event.getMonth() + 1) + "-" + (event.getDate());
    }
  }

  handleOnChangeTimePicker = (event) => {
    var eventEndTime = document.getElementById('input_event_endtime').value;
    if(eventEndTime === "") {
      document.getElementById('input_event_endtime').value = this.convert24HourTo12Hour(event.getHours() + 1, event.getMinutes());
    }
  }

  convert24HourTo12Hour = (hours, minutes) => {
    if (hours > 12) {
      return (hours - 12) + ":" + this.addZeroToMinute(minutes) + " pm";
    } else {
      return hours + ":" + this.addZeroToMinute(minutes) + " am";
    }
  }

  addZeroToMinute = (minutes) => {
    if (minutes < 10) {
      return "0" + minutes;
    } else {
      return minutes;
    }
  }

  openSearch = () => {
     this.setState({ searchOpen: true});
  }

  closeSearch = () => {
    this.setState({ searchOpen: false});
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  }

  handleSearch = () => {
    var searchFilter = ["title", "category", "tag"];
    var chosenFilter = searchFilter[this.state.searchSelectorValue - 1];
    var query = document.getElementById('input_search_field').value;

    fetch("/api/meetupEvents/" + chosenFilter + "/" + query)
      .then((response) => {
         return response.json() })
      .then((json) => {
        this.setState({ meetupEventsSearch: json });
    });

    fetch("/api/event/" + chosenFilter + "/" + query)
      .then((response) => {
         return response.json() })
      .then((json) => {
        this.setState({ eventsSearch: json });
            ReactDOM.unmountComponentAtNode(document.getElementById('searchResults'));
            ReactDOM.render(
              <SearchResultsList events={ json.concat(this.state.meetupEventsSearch) } />,
               document.getElementById('searchResults')
          );
    });
  }

  handleChangeSelectorSearch = (event, index, searchSelectorValue) => {
    this.setState({ searchSelectorValue });
  };

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
        onClick={this.validateForm}
      />,
    ];

    const actionsSearch = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeSearch}
      />,
    ];

    return (
      <nav className="blue darken-2">
        <div className="nav-wrapper">
          <a className="brand-logo center">Event Codex</a>
          <img src="../../icon.png" alt="icon" width="40" height="40"></img>
          <ul className="right">
            <MuiThemeProvider>
               <div>
                <div id="nav_buttons">
                   <div id="btnExtra">
                    <IconButton id="btnSearch" iconClassName="material-icons" onClick={this.openSearch} >search</IconButton>
                  </div>

                  <div id="btnAddEvent">
                    <RaisedButton label="Add Event" onClick={this.handleOpen} />
                  </div>
                </div>

                <div>
                  <Dialog
                      title={""}
                      actions={actionsSearch}
                      modal={false}
                      open={this.state.searchOpen}
                      onRequestClose={this.closeSearch}
                      autoScrollBodyContent={true}
                      repositionOnUpdate={false}
                      contentStyle={ dialogFixStyles.dialogContent }
                      bodyStyle={ dialogFixStyles.dialogBody }
                      style={ dialogFixStyles.dialogRoot }
                    >
                      <div>
                        <div id="searchRow">
                          <div id="fieldSearch" style={{position: 'relative', display: 'inline-block'}}>
                            <img src={SearchIcon} style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20}} alt="search icon" />
                             <TextField
                                id="input_search_field"
                                style={{textIndent: 30}}
                                hintText="Search"
                                multiLine={true}
                              />
                             <RaisedButton primary={true} id="btnSearch" label="Search" onClick={this.handleSearch} />
                          </div>

                            <div>
                              <SelectField
                                floatingLabelText="Search by"
                                value={this.state.searchSelectorValue}
                                id="select_search_filter"
                                onChange={this.handleChangeSelectorSearch}
                                selectedMenuItemStyle={{ color: '#00B8D4' }}
                              >
                                <MenuItem value={1} primaryText="Title" />
                                <MenuItem value={2} primaryText="Category" />
                                <MenuItem value={3} primaryText="Tags" />
                              </SelectField>
                            </div>

                          </div>

                       <div id="searchResults"> </div>
                    </div>
                  </Dialog>
                </div>

                <Dialog
                  title={<h1 class="blue white-text center">Event Form</h1>}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={true}
                >
                 <form id="form" method="post">
                  <div>
                    <TextField
                      floatingLabelText="Contact email"
                      id="input_email"
                      multiLine={true}
                      rows={1}
                    /><br />
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Event Title"
                      id="input_event_title"
                      multiLine={true}
                      rows={1}
                    /><br />
                  </div>

                   <div>
                    <SelectField
                      floatingLabelText="Category"
                      value={this.state.selectorValue}
                      id="select_event_category"
                      onChange={this.handleChangeSelector}
                      selectedMenuItemStyle={{ color: '#00B8D4' }}
                    >
                      <MenuItem value={1} primaryText="Cars" />
                      <MenuItem value={2} primaryText="Career" />
                      <MenuItem value={3} primaryText="Food" />
                      <MenuItem value={4} primaryText="Social" />
                      <MenuItem value={5} primaryText="Sports" />
                      <MenuItem value={6} primaryText="Technology" />
                      <MenuItem value={7} primaryText="Other" />
                    </SelectField>
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Location"
                      id="input_event_location"
                      multiLine={true}
                      rows={1}
                    /><br />
                  </div>

                 <div id="start">
                   <div>
                    <DatePicker hintText="Start Date" container="inline" mode="landscape" id="input_event_startdate" firstDayOfWeek={0} onChange={(event, x) => {this.handleOnChangeDatePicker(x)}}/>
                   </div>

                    <div>
                      <TimePicker
                        format="ampm"
                        hintText="Start Time"
                        id="input_event_starttime"
                        onChange={(event, x) => {this.handleOnChangeTimePicker(x)}}
                      />
                    </div>
                  </div>

                  <div id="end">
                    <div>
                       <DatePicker hintText="End Date" container="inline" mode="landscape" id="input_event_enddate" firstDayOfWeek={0} />
                    </div>

                    <div>
                      <TimePicker
                        value={this.state.endTime}
                        format="ampm"
                        hintText="End Time"
                        id="input_event_endtime"
                      />
                    </div>
                  </div>

                  <div>
                    <TextField
                      floatingLabelText="Website (optional)"
                      id="input_website"
                      multiLine={true}
                      rows={1}
                    /><br />
                  </div>

                  <div>
                   <TextField
                      floatingLabelText="Event Description"
                      id="input_event_description"
                      multiLine={true}
                      rows={2}
                    /><br />
                 </div>

                 <div>
                   <TextField
                      id="input_event_tags"
                      floatingLabelText="Tags"
                      multiLine={true}
                      rows={2}
                    /><br />
                  </div>
                </form>
                </Dialog>
              </div>
              <Snackbar
                open={this.state.snackbarOpen}
                message="Event submitted"
                autoHideDuration={3000}
                onRequestClose={this.handleSnackbarClose}
              />
            </MuiThemeProvider>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
