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
    if(usernam=="admin"){
        if(passwor=='adminpass'){
            res.redirect("/admin");
        } else{
            res.redirect("/");
        }
        
    } else{
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
    }
    


});

// app.get('/:userN',function(req,res){
//     const requestedUser = _.lowerCase(req.params.userN);

//     User.find({username:requestedUser},function(err,found){
        
//         res.render("employee",{EmpName:found.username})
//     });
// });
app.get('/admin',function(req,res){
    res.render("admin");
});

app.post("/admin",function(req,res){

    var newEmp = new User({
        username: req.body.UsName,
        password:req.body.pass,
        Mail_ID :req.body.email,
        ContactNumber:req.body.contact,
        Department:req.body.department,
        JoiningDate:req.body.DoJ
    });
    newEmp.save(function(err){
        if(!err){
            res.redirect("/admin");
        } else{
            res.redirect("/admin");
            console.log(err);
        }
    });

});




app.get('/:userN',function(req,res){
    const requestedUser = _.lowerCase(req.params.userN);

    User.find({username:requestedUser},function(err,found){
        //console.log(found);
        res.render("employee",{EmpName:found.username})
    })
});

app.post("/:userN",function(req,res){


    //console.log(req.body);
    //res.redirect("/");
    
    const requestedUser = _.lowerCase(req.params.userN);
    
            
        User.findOne({username:requestedUser},function(err,ser){
            //console.log(ser);
            let newEmpData = new UserDB({
                uName:ser,
                description:req.body.email,
                taskType:req.body.task,
                sTime:req.body.start,
                hourT:req.body.appt,
                Day:req.body.date
            });
            //console.log(newEmpData);
            
            newEmpData.save(function(err){
                if(!err){
                    //res.send("Success");
                    res.redirect("/"+requestedUser);
                } else{
                    res.redirect("/"+requestedUser);
                    console.log(err);
                }
            });
            

        });

});



app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
