const express = require('express');
const router = express.Router();
const {rol} = require('../controller/rolesController');

//listado de todos los roles
router.get("/", rol.listar);

//devuelve un rol especifico
router.get("/:idRol", rol.obtener);

//crear un rol
router.post("/", rol.crear);

//actualiza un usuarios
router.put("/", rol.actualizar);

//eliminar un rol
router.delete("/:idRol", rol.eliminar);

//asignar un rol a un usuario, se deben pasar por parametro el idUsuario y el idRol
router.post("/asignar", rol.asignar);

//asignar un rol a un usuario, se deben pasar por parametro el idUsuario y el idRol
router.post("/desasignar", rol.desasignar);


module.exports = router;