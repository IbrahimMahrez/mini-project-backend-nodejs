const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`\n📥 ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    console.log('Time:', new Date().toLocaleTimeString());
    next();
});

// MongoDB connection with timeout
mongoose.connect('mongodb://localhost:27017/simpletest', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err.message));

// Very simple schema - NO validation, NO unique
const testSchema = new mongoose.Schema({
    name: String,
    email: String
}, { timestamps: true });

const TestModel = mongoose.model('Test', testSchema);

// Route 1: Test without database
app.post('/api/test-no-db', (req, res) => {
    console.log('✅ Route 1: No DB test');
    res.json({ 
        success: true, 
        message: 'Server is working!',
        received: req.body 
    });
});

// Route 2: Test with database
app.post('/api/test-with-db', async (req, res) => {
    console.log('🔵 Route 2: Starting DB test...');
    
    try {
        const data = new TestModel({
            name: req.body.name || 'Test User',
            email: req.body.email || 'test@test.com'
        });
        
        console.log('🔵 Object created, saving...');
        
        const saved = await data.save();
        
        console.log('✅ Saved successfully!', saved._id);
        
        res.json({ 
            success: true, 
            message: 'Data saved!',
            data: saved 
        });
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.log('❌ Global Error:', err.message);
    res.status(500).json({ error: err.message });
});

// Start server
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`\n🚀 Simple test server running on http://localhost:${PORT}`);
    console.log('📍 Test these URLs in Postman:');
    console.log(`   1. POST http://localhost:${PORT}/api/test-no-db`);
    console.log(`   2. POST http://localhost:${PORT}/api/test-with-db`);
});