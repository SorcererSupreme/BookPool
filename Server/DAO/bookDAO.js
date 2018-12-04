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

var getBooks = function(user_id, cb){
    book.find({user_id: user_id}, "book_name authors_list genre", function(error,docs){
        if(error){
            cb(error)
        }
        else{
            cb(null,docs)
        }
    })
}

module.exports = {
     addBook,
     getBooks
    };