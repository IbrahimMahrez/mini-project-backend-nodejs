 const express = require('express');
 const{ body, validationResult } = require('express-validator');
 const cors = require('cors');
 const httpstatuestest = require('../mini api/utils/httpstatuestest');
 const asyncwrapper = require('../mini api/middleware/asyncwrapper');
 const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path=require('path')
dotenv.config();
const app = express();

app.use(express.json());//middleware to parse JSON bodies
app.use(cors());
// Connect to MongoDB
const mongoose = require('mongoose');

const url= process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);

});
// جرب هذا بدلاً منه

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('__dirname =', __dirname);

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route ');
const { status } = require('./utils/appError');
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
 


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ خطأ غير متوقع:', err);
    res.status(err.statusCode|| 500).json({  
        success: err.status || httpstatuestest.ERORR,
        message: 'Internal Server Error please try again later.',
        error: err.message
    });
});


//crud operations



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} http://localhost:${process.env.PORT}`);
});
