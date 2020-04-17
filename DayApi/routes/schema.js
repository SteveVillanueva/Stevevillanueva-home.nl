var mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/DayTracker'

mongoose.connect(url, { useNewUrlParser: true });

const DayRating = new mongoose.Schema({
    rating: { type: Number, required: true },
    date: { type: Date, required: true, unique: true },
    mood: { type: String, required: true },
    comment: String
  })
  
  module.exports = mongoose.model('DayRating', DayRating);