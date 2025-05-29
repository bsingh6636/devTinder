const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect('mongodb+srv://bsingh6636:<db_password>@db.se4bh.mongodb.net/',
      {
         serverSelectionTimeoutMS: 20000,
      });
   // await  mongoose.connect('mongodb://localhost:27017/devTinder');
}

module.exports = connectDB;