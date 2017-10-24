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

						document.getElementById('email').value = result[0].host_email;
						document.getElementById('name').value = result[0].event_name;
						document.getElementById('location').value = result[0].location;
						document.getElementById('start_date').value = result[0].start_date;
						document.getElementById('start_time').value = result[0].start_time;
						document.getElementById('description').value = result[0].event_description;

						document.getElementById('full').value = "result[1].event_name: "+ result[1].event_name;
					},
					error: function (jqXHR, exception) {
						alert("Failed to get the event");
					}
				});
	} else {
		alert("Invalid event Id");
	}
}