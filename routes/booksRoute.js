const express = require('express');
var router = express.Router();
const bookDAO = require('../DAO/bookDAO.js');
const book = require('../models/book.js');

router.get('/', function(req,res){
    res.send("INFO about all the books here!");
})

router.post('/add', function(req,res){
    var name = req.body.name;
    var authors = req.body.authors;

    var newBook = new book({
        name: name,
        authors: authors
    })
    console.log(".................",newBook);
    bookDAO(newBook, function(err,success){
        if(err)
        {
            console.log("ERROR in book creation, inside routes");
            res.send("Error could not add the book!")
        }

        else{
            console.log("Successfully added the book", success);
            res.send("Added the new book!!");
        }
    });
    console.log("book Added from route!");
})

module.exports = router;