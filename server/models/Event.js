const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
  host_email: String,
  event_name: String,
  location: String,
  start_date: String,
  start_time: String,
  end_date: String,
  end_time: String,
  event_category: String,
  event_description: String,
  tags: String,
  website_link: String,
  subject: String
});

mongoose.model('events', eventSchema);
