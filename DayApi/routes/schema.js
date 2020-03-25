var mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/DayTracker'

mongoose.connect(url, { useNewUrlParser: true });

const Rating = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    rating: { type: Number, required: true },
    mood: { type: String, required: true },
    comment: String
  })
  
  module.exports = mongoose.model('Rating', Rating);