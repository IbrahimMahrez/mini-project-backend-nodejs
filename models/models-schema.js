const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {    
        type: Number,
        required: true
    }
}); 

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;