const express = require("express");
const routes = require("./routes");
var bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const consumer = require("../src/DocumentQueue_Consumer/consumer");

const app = express();
app.use(fileupload());

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/Documents", routes);

//consumer.connect();
module.exports = app;
