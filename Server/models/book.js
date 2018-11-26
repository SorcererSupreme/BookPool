const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema(
    {
        book_name: String,
        authors_list: [],
        genre: [],
        book_id: String,
        user_id: String
    }
)

var book = mongoose.model('book',bookSchema);

module.exports  = book;
