const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Connecting the Database
connectDB();

const User = require("./model/user");

app.get("/",function(req,res){

    res.render("login");
    
});

app.post("/",function(req,res){

    const username = req.body.uname;
    const password = req.body.pass;

    
    User.findOne({name:username},function(err,foundUname){

        res.redirect("/" + username);
    });


})
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
