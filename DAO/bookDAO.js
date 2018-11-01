const connection = require('../dbconnection.js');
const book = require('../models/book.js');

var addBook = function(book,cb){
    book.save(function(err,created){
        if(err){
            console.log("ERROR in creating a new book");
            cb(err);
        }
        else{
            console.log("New book created ", created);
            cb(null,created);
        }
    });
}


module.exports = addBook;