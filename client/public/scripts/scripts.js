function addEvent() {
    var contactEmail = $('#input_email').val();
    var eventTitle = $('#input_event_title').val();
    var eventLocation = $('#input_event_location').val();
    var eventStartDate = $('#input_event_startdate').val();
    var eventStartTime = $('#input_event_starttime').val();
    var eventEndDate = $('#input_event_enddate').val();
    var eventEndTime = $('#input_event_endtime').val();
    var eventCategory = $('#select_event_category').val();
    var website = $('#input_website').val();
    var eventDescription = $('#input_event_description').val();
    var eventTags = $('#input_event_tags').val();

    var eventTitleUrl = formatTitleToUrl(eventTitle);

    if (eventTitleUrl) {
        $.ajax(
                {
                    type : "POST",
                    url  : "/api/event"+ eventTitleUrl, 
                    data : {
                        "email" : contactEmail,
                        "title" : eventTitle,
                        "location" : eventLocation,
                        "start date" : eventStartDate,
                        "start time" : eventStartTime,
                        "end date" : eventEndDate,
                        "end time" : eventEndTime,
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

function eventSubmit() {
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
    str = str.replace(/ /g,"-");
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

function putEndDate() {
    if ($('#input_event_enddate').val() == "") {
        var eventStartDate = $('#input_event_startdate').val();
        document.getElementById('input_event_enddate').value = eventStartDate;
    }
}
