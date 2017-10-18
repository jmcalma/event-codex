$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});


function addEvent() {
    var contactEmail = $('#input_email').val();
    var eventTitle = $('#input_event_title').val();
    var eventLocation = $('#input_event_location').val();
    var eventStartDate = $('#input_event_startdate').val();
    var eventStartTime = $('#input_event_starttime').val();
    var eventCategory = $('#select_event_category').val();
    var website = $('#input_website').val();
    var eventDescription = $('#input_event_description').val();
    var eventTags = $('#input_event_tags').val();

    var eventTitleUrl = formatTitleToUrl(eventTitle);

    if (eventTitleUrl) {
        $.ajax(
                {
                    type : "POST",
                    url  : "/events/" + eventTitleUrl, 
                    data : {
                        "email" : contactEmail,
                        "title" : eventTitle,
                        "location" : eventLocation,
                        "start date" : eventStartDate,
                        "start time" : eventStartTime,
                        "category" : eventCategory,
                        "website" : website,
                        "description" : eventDescription,
                        "tags" : eventTags,
                        "url" : eventTitleUrl
                    },
                });
    } else {
        alert("Event title already exists");
    }
}

function submit1() {
    if (validateForm() == true) {
        addEvent();
    } else {
        $("#input_email").prop('required',true);
        $("#input_event_title").prop('required',true);
        $("#input_event_location").prop('required',true);
        $("#input_event_startdate").prop('required',true);
        $("#input_event_starttime").prop('required',true);
        $("#input_event_description").prop('required',true);
        $("#input_event_tags").prop('required',true);
    }
}

function formatTitleToUrl(title) {
    var str = title.toLowerCase();
    str = str.replace(/ /g,"_");
    return str;
}

function validateForm() {
    var contactEmail = $('#input_email').val();
    var eventTitle = $('#input_event_title').val();
    var eventLocation = $('#input_event_location').val();
    var eventStartDate = $('#input_event_startdate').val();
    var eventStartTime = $('#input_event_starttime').val();
    var eventCategory = $('#select_event_category').val();
    var eventDescription = $('#input_event_description').val();
    var eventTags = $('#input_event_tags').val();

    if (contactEmail == "" || eventTitle == "" || eventLocation == "" || eventStartDate == "" 
        || eventStartTime == "" || eventDescription == "" || eventTags == "") {

        return false;
    }

    if (contactEmail.includes("@") == false) {
        $("#input_email").prop('required',true);
        return false;
    }
    return true;
}
