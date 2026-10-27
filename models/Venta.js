const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  items: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: Number,
      precioUnitario: Number  // Guardar el precio al momento de la venta
    }
  ],
  fecha: { type: Date, default: Date.now },
  total: Number
}, { versionKey: false });

module.exports = mongoose.model('Venta', VentaSchema, 'ventas');
