const { string } = require("i/lib/util");
const Mongoose = require("mongoose");

const UserSchema =({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  Mail_ID:{
    type:String,
    trim:true,
    lowercase:true,
    unique:true,
    required:true,
    
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
module.exports = User;