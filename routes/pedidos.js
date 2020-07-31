const express = require('express');
const router = express.Router();
const {pedido} = require('../js/pedidos');
const config = require("../config");
const mysql = require('mysql');

var connection = mysql.createConnection({
    Host     : config.Host,
    user     : config.user,
    password : config.password,
    database : config.database,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });

connection.connect();

//listado de todos los pedidos
router.get("/", (req, res) => {
    connection.query('SELECT * from pedidos', function (err, rows, fields) {
        if (err) throw err
        return res.json(rows);
      });
    connection.end();
});//pedido.listar);

//devuelve un pedido especifico
router.get("/:idPedido", pedido.obtener);

//crear un usuario
router.post("/", pedido.crear);

//actualizar un pedido
router.put("/", pedido.actualizar);

//eliminar un pedido
router.delete("/:idPedido", pedido.eliminar);

module.exports = router;