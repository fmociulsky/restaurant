const express = require('express');
const router = express.Router();
const {rol} = require('../js/roles');

//listado de todos los roles
router.get("/", rol.listar);

//devuelve un rol especifico
router.get("/:idRol", rol.obtener);

//crear un rol
router.post("/", rol.crear);

//eliminar un rol
router.delete("/:idRol", rol.eliminar);

//asignar un rol a un usuario, se deben pasar por parametro el idUsuario y el idRol
router.post("/asignar", rol.asignar);

module.exports = router;