const express = require('express');
const router = express.Router();
const {producto} = require('../controller/productosController')

//listado de todos los productos
router.get("/", producto.listar);

//devuelve un producto especifico
router.get("/:idProducto", producto.obtener);

//crear un producto
router.post("/", producto.crear);

//eliminar un producto(lo marca como deprecado)
router.delete("/:idProducto", producto.eliminar);

//actualiza un producto
router.put("/", producto.actualizar);

module.exports = router;