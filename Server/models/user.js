const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    user_name: String,
    profile_pic: String,
    user_id: String,
    facebook_id: String,
    email: String,
    role: String
})

var user = mongoose.model('user',userSchema);

module.exports = user;