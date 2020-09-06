const express = require('express');
const router = express.Router();
const {producto} = require('../controller/productosController')
const utils = require("../utils");

//listado de todos los productos
router.get("/", producto.listar);

//listado de todos los productos
router.get("/listarHabilitados",producto.listarHabilitados);

//devuelve un producto especifico
router.get("/:idProducto", producto.obtener);

//crear un producto
router.post("/", [utils.checkAdmin], producto.crear);

//eliminar un producto(lo marca como deprecado)
router.delete("/:idProducto", [utils.checkAdmin], producto.eliminar);

//actualiza un producto
router.put("/", [utils.checkAdmin], producto.actualizar);

//deshabilitar un producto
router.put("/deshabilitar/:idProducto", [utils.checkAdmin], producto.deshabilitar);

//habilitar un producto
router.put("/habilitar/:idProducto", [utils.checkAdmin], producto.habilitar);

module.exports = router;