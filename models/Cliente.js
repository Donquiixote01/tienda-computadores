const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String
}, { versionKey: false });

module.exports = mongoose.model('Cliente', ClienteSchema, 'clientes');
