let mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    images: [String],
});

module.exports = mongoose.model('Producto', productSchema);