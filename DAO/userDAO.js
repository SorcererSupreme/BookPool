const userModel  = require('../models/user.js');
const uniqid = require('uniqid');

var findOrCreateUser = function(user_profile,cb){
   return userModel.findOne({
        "facebook_id": user_profile.id
    },function(err,res){
        // console.log("error",err);
        // console.log("response",res);
        if(err){
            return cb(err,null)
        }
        else if(res == null) {
            console.log("inside null block");
            var user = new userModel({
                user_name: user_profile.displayName,
                profile_pic: user_profile.photos[0].value,
                user_id: uniqid(),
                facebook_id: user_profile.id,
                email: "test@gmail.com",
                role: "regular"
            })
            user.save(function(err,created){
                if(err){
                    return cb(err,null)
                }
                else{
                    return cb(null,created)
                }
            })
        }
        else{
            // console.log("found user in db! ", res);
            return cb(null,res);
        }
    })
}

// const a = 5;
module.exports.findOrCreateUser = findOrCreateUser;