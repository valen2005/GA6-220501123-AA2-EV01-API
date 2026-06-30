# API RESTful - GA6-220501123-AA2-EV01

API construida con **Node.js + Express + MongoDB** que permite el intercambio de información en formato JSON mediante operaciones CRUD (GET, POST, PUT, DELETE), siguiendo la metodología explicada en la sesión sincrónica técnica del módulo 6 (SENA).

## Estructura del proyecto

```
apirestful/
├── controllers/
│   ├── empleado.controller.js
│   └── producto.controller.js
├── models/
│   ├── empleado.model.js
│   └── producto.model.js
├── routes/
│   ├── empleado.routes.js
│   └── producto.routes.js
├── database.js
├── index.js
├── package.json
└── .env.example
```

## 1. Instalación

```bash
# Entrar a la carpeta del proyecto
cd apirestful

# Instalar dependencias (Express, Mongoose, cors, morgan, dotenv, nodemon)
npm install
```

## 2. Configuración de la base de datos

1. Copia el archivo `.env.example` y renómbralo a `.env`.
2. Reemplaza `MONGODB_URI` con tu cadena de conexión de **MongoDB Atlas** (o local: `mongodb://localhost:27017/apirestful_sena`).

```
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/apirestful_sena
```

## 3. Ejecutar el proyecto

```bash
# Modo desarrollo (con nodemon, recarga automática)
npm run dev

# Modo producción
npm start
```

Si todo está bien configurado verás en la consola:
```
Conexión a MongoDB establecida correctamente
Servidor corriendo en el puerto 3000
```

## 4. Endpoints disponibles

Base URL: `http://localhost:3000`

### Empleados (`/empleados`)
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/empleados` | Consultar todos los empleados |
| GET | `/empleados/:id` | Consultar un empleado por id |
| POST | `/empleados` | Crear un nuevo empleado |
| PUT | `/empleados/:id` | Actualizar un empleado |
| DELETE | `/empleados/:id` | Eliminar un empleado |

**Body JSON para POST/PUT:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "1020304050",
  "cargo": "Desarrollador",
  "salario": 2500000,
  "correo": "juan.perez@correo.com"
}
```

### Productos (`/productos`)
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/productos` | Consultar todos los productos |
| GET | `/productos/:id` | Consultar un producto por id |
| POST | `/productos` | Crear un nuevo producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |

**Body JSON para POST/PUT:**
```json
{
  "nombre": "Mouse inalámbrico",
  "descripcion": "Mouse óptico inalámbrico 2.4GHz",
  "precio": 45000,
  "stock": 30,
  "categoria": "Periféricos"
}
```

## 5. Cómo probar en Postman

1. Abre Postman y crea una nueva colección llamada **API SENA**.
2. Configura el método (GET, POST, PUT, DELETE) y la URL correspondiente (ej. `http://localhost:3000/empleados`).
3. Para **POST** y **PUT**: ve a la pestaña `Body` → selecciona `raw` → tipo `JSON`, y pega el ejemplo de arriba.
4. Para **GET** por id y **DELETE**, usa la URL con el `_id` que MongoDB asigna automáticamente al crear el registro (lo verás en la respuesta del POST).
5. Verifica que la respuesta tenga el código de estado correcto:
   - `200 OK` → consultas, actualizaciones y eliminaciones exitosas.
   - `201 Created` → creación exitosa.
   - `400 Bad Request` → datos inválidos.
   - `404 Not Found` → recurso no encontrado.

## 6. Para la sustentación en video

Muestra en orden:
1. Estructura de carpetas en VS Code.
2. `npm run dev` corriendo en la terminal y conexión exitosa a MongoDB.
3. Petición **POST** en Postman creando un empleado/producto.
4. Petición **GET** mostrando los datos guardados.
5. Petición **PUT** actualizando un registro.
6. Petición **DELETE** eliminando un registro.
7. Verificación de los datos en MongoDB Atlas (Collections).
