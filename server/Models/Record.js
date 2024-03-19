const mongoose = require("mongoose");

const RecordScheme = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  Present: {
    type: Number,
    required: true,
  },
  recordDate : {
    type: Date,
    required : true 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Record = mongoose.model("Record", RecordScheme);

module.exports = Record; 