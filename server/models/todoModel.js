const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("todo", todoSchema);
