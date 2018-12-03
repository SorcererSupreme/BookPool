const mongoose = require('mongoose');
const config = require('./config/config.js') ;

mongoose.connect(config.mongodbURL);
var db = mongoose.connection;
db.on('connected',()=>{console.log("mongodb connected!")});

// module.exports = db;