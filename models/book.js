const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema(
    {
        name: String,
        authors: String
    }
)

var book = mongoose.model('book',bookSchema);

module.exports  = book;
