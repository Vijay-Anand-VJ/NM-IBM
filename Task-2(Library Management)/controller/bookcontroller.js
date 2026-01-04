const Book = require('../models/book');

// 1. GET BOOKS (With Filters)
exports.getBooks = async (req, res) => {
    try {
        let query = {};
        
        // Filter: Books after 2015
        if (req.query.new === 'true') {
            query.publishedYear = { $gt: 2015 };
        }
        
        // Filter: By Category
        if (req.query.category) {
            query.category = req.query.category;
        }

        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. CREATE BOOK
exports.createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handles Negative Stock
    }
};

// 3. UPDATE BOOK (Increase/Decrease Copies)
exports.updateBook = async (req, res) => {
    try {
        const { change } = req.body; // Expecting +1 or -1
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ error: 'Book not found' });

        // Calculate new stock
        const newStock = book.availableCopies + change;

        // Prevent Negative Stock during Update
        if (newStock < 0) {
            return res.status(400).json({ error: 'Stock cannot be negative' });
        }

        book.availableCopies = newStock;
        await book.save();
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: 'Invalid update' });
    }
};

// 4. DELETE BOOK (Only if copies = 0)
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.availableCopies > 0) {
            return res.status(400).json({ message: 'Cannot delete: Copies are greater than 0' });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};