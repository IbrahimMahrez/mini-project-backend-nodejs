const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        required: true,
        minlength: 3
    }
}, {
    timestamps: true
});

// ✅ عرّف الـ Model
const Product = mongoose.model('Product', productSchema);

// ✅ اعمل export
module.exports = Product;