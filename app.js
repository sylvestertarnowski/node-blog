// dependancies
const express       = require("express");
const bodyParser    = require("body-parser");
const mongoose      = require('mongoose');

const app           = express();

const port = 3000;

mongoose.connect("mongodb://localhost:27017/node-blog", {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Mongoose schema setup

var blogSchema = new mongoose.Schema({ body: String });
var Blog = mongoose.model('Blog', blogSchema);

//Routes

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/blogs", (req, res) => {
    res.send('blogs');
});

app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});