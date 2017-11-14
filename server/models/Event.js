const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
  host_email: String,
  event_name: String,
  location: String,
  start_date: Date,
  end_date: Date,
  event_category: String,
  event_description: String,
  tags: String,
  website_link: String
});

mongoose.model('events', eventSchema);
