const express = require("express");
const QRCode = require("qrcode");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  QRCode.toDataURL("Hello World !")
    .then((url) => {
      res.send(`
        <h2>QRCode Generated</h2>
        <div><img src='${url}'/></div>
      `);
    })
    .catch((err) => {
      console.debug(err);
    });
});
module.exports = app;
