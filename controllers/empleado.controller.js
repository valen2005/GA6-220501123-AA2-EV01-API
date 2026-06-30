const Empleado = require('../models/empleado.model');

// GET /empleados -> Consultar todos los empleados
const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json({
      ok: true,
      total: empleados.length,
      empleados,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al consultar empleados', error: error.message });
  }
};

// GET /empleados/:id -> Consultar un empleado por id
const getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findById(id);

    if (!empleado) {
      return res.status(404).json({ ok: false, msg: `No existe un empleado con el id ${id}` });
    }

    res.status(200).json({ ok: true, empleado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al consultar el empleado', error: error.message });
  }
};

// POST /empleados -> Crear un nuevo empleado
const createEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, cedula, cargo, salario, correo } = req.body;

    const nuevoEmpleado = new Empleado({ nombre, apellido, cedula, cargo, salario, correo });
    const empleadoGuardado = await nuevoEmpleado.save();

    res.status(201).json({ ok: true, msg: 'Empleado creado correctamente', empleado: empleadoGuardado });
  } catch (error) {
    res.status(400).json({ ok: false, msg: 'Error al crear el empleado', error: error.message });
  }
};

// PUT /empleados/:id -> Actualizar un empleado existente
const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const cambios = req.body;

    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, cambios, {
      new: true,
      runValidators: true,
    });

    if (!empleadoActualizado) {
      return res.status(404).json({ ok: false, msg: `No existe un empleado con el id ${id}` });
    }

    res.status(200).json({ ok: true, msg: 'Empleado actualizado correctamente', empleado: empleadoActualizado });
  } catch (error) {
    res.status(400).json({ ok: false, msg: 'Error al actualizar el empleado', error: error.message });
  }
};

// DELETE /empleados/:id -> Eliminar un empleado
const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ ok: false, msg: `No existe un empleado con el id ${id}` });
    }

    res.status(200).json({ ok: true, msg: 'Empleado eliminado correctamente', empleado: empleadoEliminado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al eliminar el empleado', error: error.message });
  }
};

module.exports = {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
