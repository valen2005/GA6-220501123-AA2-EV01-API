require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { mongooseConnection } = require('./database');

// Configuración del puerto
app.set('port', process.env.PORT || 3000);

// Conexión a la base de datos
mongooseConnection();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));

// Rutas
app.use('/empleados', require('./routes/empleado.routes'));
app.use('/productos', require('./routes/producto.routes'));

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    msg: 'API RESTful funcionando correctamente',
    endpoints: ['/empleados', '/productos'],
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, msg: 'Ruta no encontrada' });
});

// Levantamos el servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
