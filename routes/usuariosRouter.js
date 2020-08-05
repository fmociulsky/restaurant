const express = require('express')
const router = express.Router();
const {usuario} = require('../controller/usuariosController'); 

//listado de todos los usuarios
router.get("/", usuario.listar);

//devuelve un usuarios especifico
router.get("/:idUsuario", usuario.obtener);

//crea un usuarios
router.post("/", usuario.crear);

//actualiza un usuarios
router.put("/", usuario.actualizar);

//elimina un usuarios
router.delete("/:idUsuario", usuario.eliminar);

//devuelve los roles de un usuario
router.get("/:idUsuario/roles", usuario.obtenerRoles);

module.exports = router;