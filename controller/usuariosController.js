class UsuarioController{
    listar  = (req, res) => {
        req.connection.query('SELECT * from USUARIOS',{type: req.connection.QueryTypes.SELECT}).then(
            function(usuarios){
                return res.json(usuarios);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    crear = (req, res) => {
        const body = req.body;
        const sql = "INSERT INTO usuarios (username, nombre, apellido) VALUES (?, ?, ?)";
        req.connection.query(sql, {replacements: [body.username, body.nombre, body.apellido]}).then(
            function (result) {
                return res.send("Usuario insertado: " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtener  = (req, res) => {
        req.connection.query('SELECT * from USUARIOS where username = ?',
        {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idUsuario] }
        ).then(
            function(usuarios){
                return res.json(usuarios);
            }
        )
    }

    actualizar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE USUARIOS SET nombre = ?,  apellido = ?, activo = ? where username = ?";
        req.connection.query(sql, {replacements: [body.nombre, body.apellido, body.activo, body.username]}).then(
            function (result) {
                if(result[0].affectedRows == 0) return res.send("No se realizaron cambios");
                return res.send("Usuario actualizado: " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    eliminar = (req, res) => {
        const body = req.body;
        const sql = "DELETE from USUARIOS where username = ?";
        req.connection.query(sql, {replacements: [req.params.idUsuario]}).then(
            function (result) {
                if(result[0].affectedRows == 0) return res.send("El Usuario : " + req.params.idUsuario + " no existe");
                return res.send("Usuario eliminado: " + req.params.idUsuario);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtenerRoles  = (req, res) => {
        const query = "SELECT roles.id, roles.rol, roles.admin from roles INNER JOIN usuarios_roles ON roles.id = usuarios_roles.idRol where username = ?";
        req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [req.params.idUsuario]}).then(
            function(roles){
                return res.json(roles);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }
}
function isAdmin(req) {
    const query = "SELECT * from USUARIOS INNER JOIN USUARIOS_ROLES ON usuarios.username = usuarios_roles.username " +
    "INNER JOIN ROLES ON usuarios_roles.idRol = roles.id where roles.admin = 1 and usuarios.username = ?";
    return req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [req.body.usuario]});
}

const usuario = new UsuarioController();

module.exports = {usuario, isAdmin}