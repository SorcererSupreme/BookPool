const express = require('express');
var router = express.Router();
const bookDAO = require('../DAO/bookDAO.js');
const book = require('../models/book.js');
const uniqid = require('uniqid');

router.get('/', function(req,res){
    console.log("logging the user object.......", req.session.passport.user);
    res.send("INFO about all the books here!");
})

router.post('/add', function(req,res){
    var book_name = req.body.book_name;
    var authors_list = req.body.authors_list;
    var genre = req.body.genre;
    var book_id = uniqid();
    var user_id = req.session.passport.user.user_id;


    var newBook = new book({
        book_name: book_name,
        authors_list: authors_list,
        genre: genre,
        book_id: book_id,
        user_id: user_id
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