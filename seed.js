require('dotenv').config();
const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');
const Producto = require('./models/Producto');
const Venta = require('./models/Venta');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB para seed...');

    // Limpiar colecciones
    await Cliente.deleteMany({});
    await Producto.deleteMany({});
    await Venta.deleteMany({});
    console.log('Colecciones limpiadas: clientes, productos, ventas');

    // Insertar clientes
    const clientes = await Cliente.insertMany([
      {
        nombre: 'Juan Pérez',
        direccion: 'Av. Central 123',
        telefono: '77712345'
      },
      {
        nombre: 'María López',
        direccion: 'Calle Secundaria 456',
        telefono: '77767890'
      }
    ]);
    console.log('Clientes insertados:', clientes.length);

    // Insertar productos
    const productos = await Producto.insertMany([
      {
        nombre: 'Laptop HP 15"',
        precio: 8500,
        marca: 'HP',
        categoria: 'Laptops'
      },
      {
        nombre: 'Mouse Logitech M185',
        precio: 250,
        marca: 'Logitech',
        categoria: 'Periféricos'
      },
      {
        nombre: 'Teclado Mecánico Redragon',
        precio: 650,
        marca: 'Redragon',
        categoria: 'Periféricos'
      },
      {
        nombre: 'Monitor LG 24"',
        precio: 3200,
        marca: 'LG',
        categoria: 'Monitores'
      }
    ]);
    console.log('Productos insertados:', productos.length);

    // Crear venta para el primer cliente con 2 productos distintos
    const cliente1 = clientes[0];
    const laptop = productos[0];        // Laptop HP 15"
    const mouse = productos[1];        // Mouse Logitech M185

    const itemsVenta = [
      {
        producto: laptop._id,
        cantidad: 1,
        precioUnitario: laptop.precio
      },
      {
        producto: mouse._id,
        cantidad: 2,
        precioUnitario: mouse.precio
      }
    ];

    const totalVenta = (laptop.precio * 1) + (mouse.precio * 2);

    const venta = new Venta({
      cliente: cliente1._id,
      items: itemsVenta,
      fecha: new Date(),
      total: totalVenta
    });

    await venta.save();
    console.log('Venta creada correctamente');
    console.log('Detalle:', {
      cliente: cliente1.nombre,
      items: [
        { producto: laptop.nombre, cantidad: 1, precioUnitario: laptop.precio },
        { producto: mouse.nombre, cantidad: 2, precioUnitario: mouse.precio }
      ],
      total: totalVenta
    });

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB. Seed finalizado.');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedData();
