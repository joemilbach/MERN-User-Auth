const config = require("config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions,
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/userModel"),
};
