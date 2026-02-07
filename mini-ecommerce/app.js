

 const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());  // Middleware to parse JSON bodies
 // Middleware to enable CORS
// ✅ الـ URL الصحيح (لاحظ jappawn)
const url = process.env.MONGO_URL ;

mongoose.connect(url)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ Connection Error:', err));

// Routes
const productsRouter = require('../mini-ecommerce/routers/products.route');
// حط ده بعد app.use(express.json());
app.get('/test', (req, res) => {
    res.json({ message: 'Test works!' });
});

// بعدين حط ده
app.use((req, res, next) => {
    console.log(`📥 Incoming: ${req.method} ${req.url}`);
    next();
});

app.use('/api', productsRouter);

app.use((err, req, res, next) => {
    console.error('❌ خطأ غير متوقع:', err);
    res.status(err.statusCode|| 500).json({  
        success: err.status || httpstatuestest.ERORR,
        message: 'Internal Server Error please try again later.',
        error: err.message
    });
});


app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});

