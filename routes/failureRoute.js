const express = require('express');
const router = express.Router();
// const app = 

router.get('/failure',function(req,res){
    console.log("inside failure route!");
    res.send("Failed to login! Plz try again");
    res.end();
})

module.exports = router;