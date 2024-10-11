const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect('mongodb+srv://bsingh6636:d78gGS9XYijdt72k@namastenode.hvkeh.mongodb.net/?retryWrites=true&w=majority&appName=namasteNode/devTinder',
      {
         serverSelectionTimeoutMS: 20000,
      });
   // await  mongoose.connect('mongodb://localhost:27017/devTinder');
}

module.exports = connectDB;