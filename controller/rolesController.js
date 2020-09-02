class RolController{
    listar  = (req, res) => {
        req.connection.query('SELECT * from ROLES',{type: req.connection.QueryTypes.SELECT}).then(
            function(roles){
                return res.json(roles);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    crear = (req, res) => {
        const body = req.body;
        const sql = "INSERT INTO ROLES (rol, admin) VALUES (?, ?)";
        req.connection.query(sql, {replacements: [body.rol, body.admin]}).then(
            function (result) {
                return res.send("Rol insertado: " + body.rol);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtener  = (req, res) => {
        req.connection.query('SELECT * from ROLES where id = ?',
        {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idRol] }
        ).then(
            function(rol){
                return res.json(rol);
            }
        )
    }

    actualizar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE ROLES SET rol = ?, admin = ? where id = ?";
        req.connection.query(sql, {replacements: [body.rol, body.admin, body.id]}).then(
            function (result) {
                if(result[0].affectedRows == 0) return res.send("No se realizaron cambios");
                return res.send("Rol actualizado: " + body.rol);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    eliminar = (req, res) => {
        const body = req.body;
        req.connection.query('SELECT * from USUARIOS_ROLES where idRol = ?', {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idRol] }
        ).then(function(result){
            if(result.length == 0){
                const sql = "DELETE from ROLES where id = ?";
                req.connection.query(sql, {replacements: [req.params.idRol]}).then(
                    function (result) {
                        if(result[0].affectedRows == 0) return res.send("El Rol: " + req.params.idRol + " no existe");
                        return res.send("Rol eliminado: " + req.params.idRol);
                }).catch(error => {
                    console.log(error);
                    res.status(500);
                    return res.send(error.original.sqlMessage);
                });
            }else{
                res.status(500);
                return res.send("El Rol " + req.params.idRol + " no se puede eliminar ya que se encuentra asignado a usuarios");
            }
        });
    }

    asignar = (req, res) => {
        const body = req.body;
        const sql = "INSERT INTO USUARIOS_ROLES (username, idRol) VALUES (?, ?)";
        req.connection.query(sql, {replacements: [body.username, body.idRol]}).then(
            function (result) {
                return res.send("Rol " + body.idRol + " asignado al Usuario " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    desasignar = (req, res) => {
        const body = req.body;
        const sql = "DELETE from USUARIOS_ROLES where username = ? AND idRol = ?)";
        req.connection.query(sql, {replacements: [body.username, body.idRol]}).then(
            function (result) {
                if(result[0].affectedRows == 0) return res.send("El Rol: " + body.idRol + " no estaba asignado al usuario " + body.username);
                return res.send("Rol " + body.idRol + " desasignado al Usuario " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }
}

const rol = new RolController();

module.exports = {rol}