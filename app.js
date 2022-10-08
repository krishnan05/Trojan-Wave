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

const {User} = require("./model/user");
const {UserDB} = require("./model/user");

app.get("/",function(req,res){

    res.render("login");
    
});

app.post("/",function(req,res){

    const usernam = req.body.uname;
    const passwor = req.body.pass;
    
    User.findOne({username:usernam},function(err,user){
        //console.log(user);
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

// app.get('/:userN',function(req,res){
//     const requestedUser = _.lowerCase(req.params.userN);

//     User.find({username:requestedUser},function(err,found){
        
//         res.render("employee",{EmpName:found.username})
//     });
// });

app.get('/:userN',function(req,res){
    const requestedUser = _.lowerCase(req.params.userN);

    User.find({username:requestedUser},function(err,found){
        
        res.render("employee",{EmpName:found.username})
    })
});

app.post("/taskDone",function(req,res){

    const data = req.body.email;
    console.log(req.body);
    res.redirect("/");

    // const uName=User.findOne({username:requestedUser});


    // const newEmpData = new UserDB({
    //     uname: uName,
    //     descreption:req.body.email,
    //     taskType:req.body.task,
    //     // sTime:req.body.start,
    //     // hourT:req.body.appt
    // });
    // //console.log(newEmpData);
    // newEmpData.save(function(err){
    //     if(!err){
    //         res.send("Success");
    //         res.redirect("/:userN");
    //     } else{
    //         res.send(err);
    //     }
    // });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
