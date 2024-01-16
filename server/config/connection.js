require("dotenv").config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://rst1426:irC6YFHqOwJi5vpc@cluster0.5k55w.mongodb.net/Book-engine?retryWrites=true&w=majority');

module.exports = mongoose.connection;
