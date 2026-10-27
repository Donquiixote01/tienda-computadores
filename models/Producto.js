const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: String,      // Nombre del producto (ej. Laptop HP 15")
  precio: Number,      // Precio del producto
  marca: String,       // Marca (HP, Logitech, etc.)
  categoria: String    // Categoria (Laptops, Periféricos, Monitores)
}, { versionKey: false });

module.exports = mongoose.model('Producto', ProductoSchema, 'productos');
