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
app.use(expressSanitizer());
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
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render("blogs", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
})

app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio");
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});