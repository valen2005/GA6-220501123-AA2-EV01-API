const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
    },
    cedula: {
      type: String,
      required: [true, 'La cédula es obligatoria'],
      unique: true,
      trim: true,
    },
    cargo: {
      type: String,
      required: [true, 'El cargo es obligatorio'],
      trim: true,
    },
    salario: {
      type: Number,
      required: [true, 'El salario es obligatorio'],
      min: [0, 'El salario no puede ser negativo'],
    },
    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      trim: true,
      lowercase: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Empleado', empleadoSchema);
