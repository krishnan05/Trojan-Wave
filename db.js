
const Mongoose = require("mongoose");


const loginDB = 'mongodb+srv://trojan-wave:trojan-admin@cluster0.krvlcht.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  await Mongoose.connect(loginDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB Connected")
}
module.exports = connectDB;