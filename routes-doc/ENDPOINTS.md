# Rutas / Endpoints - Tienda de Computadores

## Clientes
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/clientes` | Crear cliente |
| GET | `/api/clientes` | Obtener todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| PUT | `/api/clientes/:id` | Actualizar cliente completo |
| PATCH | `/api/clientes/:id` | Actualizar cliente parcial |
| DELETE | `/api/clientes/:id` | Eliminar cliente |
| GET | `/api/clientes/:id/ventas` | Obtener todas las ventas de un cliente específico (con populate) |

## Productos
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/productos` | Crear producto |
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| PUT | `/api/productos/:id` | Actualizar producto completo |
| PATCH | `/api/productos/:id` | Actualizar producto parcial |
| DELETE | `/api/productos/:id` | Eliminar producto |

## Ventas / Facturación
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/ventas` | Crear venta/factura. Busca precio en `productos`, guarda `precioUnitario` por item y calcula `total`. |
| GET | `/api/ventas` | Obtener todas las ventas con `.populate('cliente')` y `.populate('items.producto')`, ordenadas por `fecha` descendente |
| GET | `/api/ventas/:id` | Obtener una venta por ID con `.populate('cliente')` y `.populate('items.producto')` |
