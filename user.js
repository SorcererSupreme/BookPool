module.exports.User  = {
	findOrCreate: function(appId, cb){
		console.log("A new user is created! with facebookid = " + appId.facebookId);
		var profile = appId.facebookId;
		console.log("profile is ",JSON.stringify(profile))
		return cb(null,profile);
	}
}