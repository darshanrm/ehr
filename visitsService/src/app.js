const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/visitDetails',routes);

module.exports = app;