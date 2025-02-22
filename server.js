﻿require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("utility/jwt");
const errorHandler = require("utility/errorHandler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./users/usersController"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;
const server = app.listen(port, function () {
  console.log("Server listening on port: " + port);
});
