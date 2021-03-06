const express = require('express');
var router = express.Router();
const {addBook, getBooks} = require('../DAO/bookDAO.js');
const book = require('../models/book.js');
const uniqid = require('uniqid');
// const passportConfig = require('../config/passportConfig.js');


// router.use(passportConfig.initialize());


router.get('/', function(req,res){
    var user_id = req.session.passport.user.user_id;
    getBooks(user_id, function(err,docs){
        if(err){
            res.send("Unable to fetch Books");
        }
        else{
            console.log("books fetched ====================>");
            console.log(docs);
            res.send(docs);
        }
    })
    // res.send("INFO about all the books here!");
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
    addBook(newBook, function(err,success){
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