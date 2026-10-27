const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Venta = require('../models/Venta');

// POST /api/clientes -> Crear cliente
router.post('/clientes', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear cliente', error: error.message });
  }
});

// GET /api/clientes -> Obtener todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
  }
});

// GET /api/clientes/:id -> Obtener cliente por ID
router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
  }
});

// PUT /api/clientes/:id -> Actualizar cliente completo
router.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, overwrite: true });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar cliente', error: error.message });
  }
});

// PATCH /api/clientes/:id -> Actualizar cliente parcial
router.patch('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar cliente', error: error.message });
  }
});

// DELETE /api/clientes/:id -> Eliminar cliente
router.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
  }
});

// GET /api/clientes/:id/ventas -> Obtener todas las ventas de a un cliente específico
router.get('/clientes/:id/ventas', async (req, res) => {
  try {
    const ventas = await Venta.find({ cliente: req.params.id })
      .populate('cliente')
      .populate('items.producto')
      .sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas del cliente', error: error.message });
  }
});

module.exports = router;
