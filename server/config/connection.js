const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Trevis-williams:<TrevIs08!>@cluster0.adqqwnu.mongodb.net/?retryWrites=true&w=majority');

module.exports = mongoose.connection;
