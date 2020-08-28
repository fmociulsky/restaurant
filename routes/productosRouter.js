const express = require('express');
const router = express.Router();
const {producto} = require('../controller/productosController')

//listado de todos los productos
router.get("/", producto.listar);

//listado de todos los productos
router.get("/listarHabilitados", producto.listarHabilitados);

//devuelve un producto especifico
router.get("/:idProducto", producto.obtener);

//crear un producto
router.post("/", producto.crear);

//eliminar un producto(lo marca como deprecado)
router.delete("/:idProducto", producto.eliminar);

//actualiza un producto
router.put("/", producto.actualizar);

//deshabilitar un producto
router.put("/deshabilitar/:idProducto", producto.deshabilitar);

//habilitar un producto
router.put("/habilitar/:idProducto", producto.habilitar);

module.exports = router;