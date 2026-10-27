const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

// POST /api/ventas -> Crear venta/factura
router.post('/ventas', async (req, res) => {
  try {
    const { cliente, items } = req.body;

    if (!cliente || !items || items.length === 0) {
      return res.status(400).json({ mensaje: 'Se requiere cliente e items para generar la venta' });
    }

    let total = 0;
    const itemsConPrecio = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const producto = await Producto.findById(item.producto);

      if (!producto) {
        return res.status(404).json({ mensaje: `Producto con ID ${item.producto} no encontrado` });
      }

      const precioUnitario = producto.precio;
      const cantidad = Number(item.cantidad) || 0;
      const subtotal = precioUnitario * cantidad;

      total += subtotal;

      itemsConPrecio.push({
        producto: producto._id,
        cantidad: cantidad,
        precioUnitario: precioUnitario
      });
    }

    const nuevaVenta = new Venta({
      cliente: cliente,
      items: itemsConPrecio,
      fecha: new Date(),
      total: total
    });

    const ventaGuardada = await nuevaVenta.save();
    const ventaPopulada = await Venta.findById(ventaGuardada._id)
      .populate('cliente')
      .populate('items.producto');

    res.status(201).json(ventaPopulada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear venta', error: error.message });
  }
});

// GET /api/ventas -> Obtener todas las ventas con populate cliente e items.producto. Ordenar por fecha descendente
router.get('/ventas', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente')
      .populate('items.producto')
      .sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
});

// GET /api/ventas/:id -> Obtener una venta por ID con populate cliente e items.producto
router.get('/ventas/:id', async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate('cliente')
      .populate('items.producto');
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener venta', error: error.message });
  }
});

module.exports = router;
