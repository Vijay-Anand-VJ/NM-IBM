const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    author: { 
        type: String, 
        required: [true, "Author is required"] 
    },
    category: { 
        type: String, 
        required: [true, "Category is required"] 
    },
    publishedYear: { 
        type: Number, 
        required: true 
    },
    availableCopies: { 
        type: Number, 
        required: true,
        min: [0, "Stock cannot be negative"] // PREVENTS NEGATIVE STOCK
    }
});

module.exports = mongoose.model('Book', bookSchema);