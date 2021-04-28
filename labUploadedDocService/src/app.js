const express = require("express");
const routes = require("./routes");
var bodyParser = require("body-parser");
const cors = require("cors");
const express_upload = require("express-fileupload");

const app = express();
app.use(express_upload());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("response");
  res.send("response");
});

app.use("/Documents", routes);

module.exports = app;
