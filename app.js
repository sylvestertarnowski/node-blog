// dependancies
const express       = require("express");
const bodyParser    = require("body-parser");
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');

const app           = express();

const port = 3000;

mongoose.connect("mongodb://localhost:27017/node-blog");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Mongoose schema setup

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});