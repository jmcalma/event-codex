const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 1}
  });

mongoose.model('users', userSchema);
