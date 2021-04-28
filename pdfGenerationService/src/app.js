const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const date = require("./currentDate");
const consumer = require("./QueueConsumer/consumer");
const prescriptionConsumer = require("./QueueConsumer/prescriptionConsumer");
const medicationConsumer = require("./QueueConsumer/medicationConsumer");

const app = express();

app.use(bodyParser.json());
app.use(cors());

consumer.connect();
prescriptionConsumer.connect();
medicationConsumer.connect();

module.exports = app;
