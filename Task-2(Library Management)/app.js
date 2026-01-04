const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Required for handling folder paths
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 3000;

// 1. Middleware to parse JSON data
app.use(express.json());

// 2. Serve Frontend Files 
app.use(express.static(path.join(__dirname, 'frontend')));

// 3. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/libraryDB')
    .then(() => console.log('Connected to MongoDB (libraryDB)'))
    .catch(err => console.error('Connection Error:', err));

// 4. Use Routes
app.use('/', bookRoutes);

// 5. Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});