
const Mongoose = require("mongoose");


const loginDB = `mongodb://localhost:27017/login`;

const connectDB = async () => {
  await Mongoose.connect(loginDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB Connected")
}
module.exports = connectDB;