# Diccionario de Datos

## Colección: clientes
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| nombre | String | Opcional | Nombre completo del cliente |
| direccion | String | Opcional | Dirección del cliente |
| telefono | String | Opcional | Teléfono de contacto |

## Colección: productos
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único |
| nombre | String | Opcional | Nombre del producto (ej. Laptop HP 15") |
| precio | Number | Opcional | Precio unitario actual |
| marca | String | Opcional | Marca del producto |
| categoria | String | Opcional | Categoría (Laptops, Periféricos, Monitores) |

## Colección: ventas
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| _id | ObjectId | Sí | Identificador único (N° de factura) |
| cliente | ObjectId (ref: Cliente) | Sí | Referencia al cliente |
| items[] | Array | Sí | Detalle de productos vendidos |
| items[].producto | ObjectId (ref: Producto) | Sí | Referencia al producto |
| items[].cantidad | Number | Opcional | Cantidad vendida |
| items[].precioUnitario | Number | Opcional | Precio al momento de la venta |
| fecha | Date (default: Date.now) | Sí | Fecha y hora de la venta |
| total | Number | Opcional | Total calculado de la factura |
