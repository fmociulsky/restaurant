const express = require('express');
const router = express.Router();
const {pedido} = require('../js/pedidos');

//listado de todos los pedidos
router.get("/", pedido.listar);

//devuelve un pedido especifico
router.get("/:idPedido", pedido.obtener);

//crear un usuario
router.post("/", pedido.crear);

//actualizar un pedido
router.put("/", pedido.actualizar);

//eliminar un pedido
router.delete("/:idPedido", pedido.eliminar);

module.exports = router;