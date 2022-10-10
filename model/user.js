const { string } = require("i/lib/util");
const Mongoose = require("mongoose");

const UserSchema =({
  username: {
    type: String,
   
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    //required: true,
  },
  Mail_ID:{
    type:String,
    trim:true,
    lowercase:true,
   
    //required:true,
    
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    immutable:true

  },
  ContactNumber:{
    type:Number,
    length:10
  },
  Department:{
    type:String
  },
  JoiningDate:{
    type:Date
  }

});

const User = Mongoose.model("user", UserSchema);


const UserDBSchema =({

  uName:{
  type:UserSchema,

  },
  Day:{
    type:Date,
    required:true
    
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
      type:String
  }


});

const UserDB = Mongoose.model("userDB", UserDBSchema);
module.exports ={
  User:User,
  UserDB:UserDB
}