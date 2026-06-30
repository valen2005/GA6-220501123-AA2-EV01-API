const Producto = require('../models/producto.model');

// GET /productos -> Consultar todos los productos
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({
      ok: true,
      total: productos.length,
      productos,
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al consultar productos', error: error.message });
  }
};

// GET /productos/:id -> Consultar un producto por id
const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ ok: false, msg: `No existe un producto con el id ${id}` });
    }

    res.status(200).json({ ok: true, producto });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al consultar el producto', error: error.message });
  }
};

// POST /productos -> Crear un nuevo producto
const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, categoria });
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({ ok: true, msg: 'Producto creado correctamente', producto: productoGuardado });
  } catch (error) {
    res.status(400).json({ ok: false, msg: 'Error al crear el producto', error: error.message });
  }
};

// PUT /productos/:id -> Actualizar un producto existente
const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const cambios = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(id, cambios, {
      new: true,
      runValidators: true,
    });

    if (!productoActualizado) {
      return res.status(404).json({ ok: false, msg: `No existe un producto con el id ${id}` });
    }

    res.status(200).json({ ok: true, msg: 'Producto actualizado correctamente', producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ ok: false, msg: 'Error al actualizar el producto', error: error.message });
  }
};

// DELETE /productos/:id -> Eliminar un producto
const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ ok: false, msg: `No existe un producto con el id ${id}` });
    }

    res.status(200).json({ ok: true, msg: 'Producto eliminado correctamente', producto: productoEliminado });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al eliminar el producto', error: error.message });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
