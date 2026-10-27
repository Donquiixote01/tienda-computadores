const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// POST /api/productos -> Crear producto
router.post('/productos', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    const nuevoProducto = await producto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear producto', error: error.message });
  }
});

// GET /api/productos -> Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
});

// GET /api/productos/:id -> Obtener producto por ID
router.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: error.message });
  }
});

// PUT /api/productos/:id -> Actualizar producto completo
router.put('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, overwrite: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
});

// PATCH /api/productos/:id -> Actualizar producto parcial
router.patch('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
});

// DELETE /api/productos/:id -> Eliminar producto
router.delete('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
});

module.exports = router;
