import React, { Component } from "react";

class Form extends Component {

  componentDidMount() {
    const s = document.createElement('script');
    s.src = "https://cdn.rawgit.com/kybarg/mdl-selectfield/mdl-menu-implementation/mdl-selectfield.min.js";
    s.async = true;

    const s2 = document.createElement('script');
    s2.src = "https://code.getmdl.io/1.3.0/material.min.js";
    s2.async = true;

    document.body.appendChild(s2);
    document.body.appendChild(s);
  }

  handSubmit(event) {

  }


  render() {
    return (
      <div id="formContainer">
        <div id="space"></div>

        <div id="space2"></div>
        <div id="container">
          <div id="form_title">
            <h1>Create Event</h1>
          </div>

        <form id="event_form" onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="input_email"/>
            <label className="mdl-textfield__label">Contact email</label>
          </div>

          <div></div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="input_event_title"/>
            <label className="mdl-textfield__label">Event Title</label>
          </div>

          <div></div>
        
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="input_event_location"/>
            <label className="mdl-textfield__label">Location</label>
          </div>

        <div>
          <div id="start">
            <div>
               <label>Start Date</label>
               <input type="text" className="datepicker" id="input_event_startdate" onchange="putEndDate()"/>
            </div>

            <div>
               <label>Start Time</label>
               <input type="text" className="timepicker" id="input_event_starttime"/>
            </div>
          </div>

          <div id="end">
            <div>
               <label>End Date</label>
               <input type="text" className="datepicker" id="input_event_enddate"/>
            </div>

            <div>
               <label>End Time</label>
               <input type="text" className="timepicker" id="input_event_endtime"/>
            </div>
          </div>
        </div>

          <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
            <select className="mdl-selectfield__select" id="select_event_category">
              <option value="option1">option 1</option>
              <option value="option2">option 2</option>
              <option value="option3">option 3</option>
              <option value="option4">option 4</option>
              <option value="option5">option 5</option>
            </select>
            <label className="mdl-selectfield__label" for="eventcategory" id="category_label">Event Category</label>
          </div>

          <div></div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
           <input className="mdl-textfield__input" type="text" id="input_website"/>
           <label className="mdl-textfield__label">Website (optional)</label>
          </div>

          <div></div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea className="mdl-textfield__input" type="text" rows= "5" id="input_event_description"></textarea>
            <label className="mdl-textfield__label">Event Description</label>
          </div>

          <div></div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea className="mdl-textfield__input" type="text" rows= "2" id="input_event_tags"></textarea>
            <label className="mdl-textfield__label">Tags (separate with commas)</label>
          </div>
          <div></div>

          <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" 
          onclick="eventSubmit()">Submit</button>

        </form>

        </div>
      </div>
    );
  }
}

export default Form;
