const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const consumer = require("./queue/consumer");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/Medication", routes);
consumer.connect();

module.exports = app;
