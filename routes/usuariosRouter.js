const express = require('express')
const router = express.Router();
const {usuario} = require('../controller/usuariosController'); 
const utils = require("../utils");

router.post('/login', usuario.login);

//listado de todos los usuarios
router.get("/", [utils.validarToken, utils.checkListar], usuario.listar);

//devuelve un usuarios especifico
router.get("/:idUsuario", [utils.validarToken], usuario.obtener);

//crea un usuarios
router.post("/", [utils.validarToken], usuario.crear);

//actualiza un usuarios
router.put("/", [utils.validarToken], usuario.actualizar);

//elimina un usuarios
router.delete("/:idUsuario", [utils.validarToken], usuario.eliminar);

//devuelve los roles de un usuario
router.get("/:idUsuario/roles", [utils.validarToken], usuario.obtenerRoles);

module.exports = router;