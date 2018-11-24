// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');


const app = express();

const port = 3000;

mongoose.connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true });

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Mongoose schema setup

var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: { type: Date, default: Date.now }
});
var Blog = mongoose.model('Blog', blogSchema);

//Routes

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/blogs", (req, res) => {
    res.render('blogs');
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
})

app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});