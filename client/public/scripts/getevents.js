function function1() {
	getEvent();
}

const api = "http://localhost:5000/api/event";

function getEvent() {
	var eventApi = "api/event"
	if (eventApi) {
		$.ajax(
				{
					type : "GET",
					url  : "http://localhost:5000/" + eventApi,
					data : {
					},
					success : function(result) {
						console.log(result);

						document.getElementById('created').value = result[0].created;
						document.getElementById('id').value = result[0].id;
						document.getElementById('name').value = result[0].name;
						document.getElementById('utc').value = result[0].utc_offset;
						document.getElementById('state').value = result[0].venue.state;
						document.getElementById('rsvp').value = result[0].yes_rsvp_count;

						document.getElementById('full').value = "result[1].name: "+ result[1].name;
					},
					error: function (jqXHR, exception) {
						alert("Failed to get the event");
					}
				});
	} else {
		alert("Invalid event Id");
	}
}