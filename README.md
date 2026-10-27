# Proyecto: Sistema para Venta de Computadoras (tienda-computadores)

## Datos de Identificación
- **Estudiante:** [Clemente Salomon Gabriel David]
- **Carrera:** [Ingenieria de Sistema e Informatica]
- **Asignatura:** [Ingenieria Web]
- **Fecha:** [27/10/2026]

## Descripción Técnica
API REST desarrollada con Node.js, Express, Mongoose y MongoDB para gestionar clientes, productos y el proceso de facturación/ventas de una tienda de computadores.

**Base de datos:** `tienda_computadores`  
**Conexión:** `mongodb://localhost:27017/tienda_computadores`  
**Puerto:** `4000`

## Tecnologías
- Node.js
- Express
- Mongoose
- dotenv
- cors
- morgan
- nodemon (desarrollo)

## Estructura del Proyecto
```text
tienda-computadores/
├── index.js
├── .env
├── .gitignore
├── package.json
├── seed.js
├── models/
│   ├── Cliente.js
│   ├── Producto.js
│   └── Venta.js
├── routes/
│   ├── clienteRoutes.js
│   ├── productoRoutes.js
│   └── ventaRoutes.js
├── docs/
├── database/
│   └── sql/
└── routes-doc/
```

## Instrucciones para Ejecución
1. Clonar el repositorio
2. Abrir terminal en la carpeta `tienda-computadores`
3. Instalar dependencias
   ```bash
   npm install
   ```
4. Asegurarse de tener MongoDB corriendo localmente (`mongod`)
5. Ejecutar seed para cargar datos de prueba
   ```bash
   npm run seed
   ```
6. Levantar el servidor
   ```bash
   npm run dev
   # o
   npm start
   ```
7. Probar en Postman: `http://localhost:4000`

## Endpoints Principales
Ver detalle en: [`routes-doc/ENDPOINTS.md`](routes-doc/ENDPOINTS.md)

## Diseño de Base de Datos
Ver en carpeta [`docs/`](docs/)

## Scripts SQL (Referencia Conceptual)
Ver en carpeta [`database/sql/`](database/sql/)

## Nota
El archivo `.env` está excluido mediante `.gitignore`. No se debe subir al repositorio.
