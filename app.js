const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
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

    const usernam = req.body.uname;
    const passwor = req.body.pass;
    
    User.findOne({username:usernam},function(err,user){
        
        if(user.password === passwor){
            //res.send("Success");
            
            res.redirect("/" + usernam);
        }
        else{
           
            res.send("Error");
            res.redirect("/");
        }
        
    });

});

app.get('/:userN',function(req,res){
    const requestedUser = _.lowerCase(req.params.userN);

    User.find({username:requestedUser},function(err,found){
        
        res.render("employee",{EmpName:found.username})
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
