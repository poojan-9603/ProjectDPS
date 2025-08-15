// models/Timetable.js
const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },

  entries: [{
    period: {
    type: Number,
    },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
  },
  time: {
    type: String, // e.g. "09:00 AM"
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId, // or teacherId if linked
    ref: 'Teacher',
    required: true,
  }
  }]
  
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Timetable', TimetableSchema);
