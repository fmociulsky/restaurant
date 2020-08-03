const express = require('express')
const router = express.Router();
const {usuario} = require('../controller/usuarios'); 

//listado de todos los usuarios
router.get("/", usuario.listar);

//devuelve un producto especifico
router.get("/:idUsuario", usuario.obtener);

//crea un usuario
router.post("/", usuario.crear);

//actualiza un producto
router.put("/", usuario.actualizar);

//elimina un producto
router.delete("/:idUsuario", usuario.eliminar);

//devuelve los roles de un usuario
router.get("/:idUsuario/roles", usuario.obtenerRoles);

module.exports = router;