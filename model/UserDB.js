const Mongoose = require("mongoose");
const User = require("./user");

const UserDBSchema =({

    uName:{
    type:UserSchema
    },
    description:{
        type:String
    }, 
    taskType:{
        type:String
    }, 
    sTime:{
        type:String
    },
    hourT:{
        type:Number
    }


});

const UserDB = Mongoose.model("userDB", UserDBSchema);
module.exports = UserDB;