require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', clienteRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API REST Tienda de Computadores - Sistema de Facturación',
    rutas: [
      'POST/GET/PUT/PATCH/DELETE /api/clientes',
      'POST/GET/PUT/PATCH/DELETE /api/productos',
      'POST /api/ventas',
      'GET /api/ventas',
      'GET /api/ventas/:id',
      'GET /api/clientes/:id/ventas'
    ]
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB: tienda_computadores');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });
