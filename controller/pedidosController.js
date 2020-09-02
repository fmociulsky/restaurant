class PedidoController{
    listar  = (req, res) => {
        req.connection.query('SELECT * from PEDIDOS',{type: req.connection.QueryTypes.SELECT}).then(
            function(pedidos){
                return res.json(pedidos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    crear = (req, res) => {
        const body = req.body;
        const productos = body.productos;
        const sql = "INSERT INTO PEDIDOS (username, idProducto, cantidad) VALUES (?, ?, ?)";
        for (let i = 0; i < productos.length; i++) {
            const idProducto = productos[i].idProduct;
            const cantidad = productos[i].cantidad;
            req.connection.query(sql, {replacements: [body.username, idProducto, cantidad]}).then(
                function (result) {
                    console.log("Pedido creado-> " + idProducto + " - " + body.username + ": " + cantidad);
            }).catch(error => {
                console.log(error);
                res.status(500);
                return res.send(error.original.sqlMessage);
            });
        }
        console.log(respuesta);
        return res.send("Se creo el pedido");
    }

    obtener  = (req, res) => {
        req.connection.query('SELECT * from PEDIDOS where id = ?',
        {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idPedido] }
        ).then(
            function(pedidos){
                return res.json(pedidos);
            }
        )
    }

    actualizar = (req, res) => {
        const body = req.body;

        const query = "SELECT * from USUARIOS INNER JOIN USUARIOS_ROLES ON usuarios.username = usuarios_roles.username " +
        "INNER JOIN ROLES ON usuarios_roles.idRol = roles.id where roles.admin = 1 and usuarios.username = ?";
        req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [body.usuario]}).then(
            function(usuarios){
                if(usuarios.length > 0){
                    const sql = "UPDATE PEDIDOS SET username = ?,  idProducto = ?, estado = ?, cantidad = ? where id = ?";
                    req.connection.query(sql, {replacements: [body.username, body.idProducto, body.estado, body.cantidad, body.id]}).then(
                        function (result) {
                            if(result[0].affectedRows == 0) return res.send("No se realizaron cambios");
                            return res.send("Pedido actualizado: " + body.idProducto + " - " + body.username);
                    }).catch(error => {
                        console.log(error);
                        res.status(500);
                        return res.send(error.original.sqlMessage);
                    });
                }else{
                    res.status(500);
                    return res.send("El usuario " + body.usuario + " no puede modificar los pedidos porque no tiene el rol Administrador");
                }
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });



        
    }

    eliminar = (req, res) => {
        const body = req.body;
        const query = "SELECT * from USUARIOS INNER JOIN USUARIOS_ROLES ON usuarios.username = usuarios_roles.username " +
        "INNER JOIN ROLES ON usuarios_roles.idRol = roles.id where roles.admin = 1 and usuarios.username = ?";
        req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [body.usuario]}).then(
            function (usuarios) {
                if(usuarios.length > 0){
                    const sql = "DELETE from PEDIDOS where id = ?";
                    req.connection.query(sql, {replacements: [req.params.idPedido]}).then(
                        function (result) {
                            if(result[0].affectedRows == 0) return res.send("El Pedido nro: " +req.params.idPedido + " no existe");
                            return res.send("Pedido eliminado: " + req.params.idPedido);
                    }).catch(error => {
                        console.log(error);
                        res.status(500);
                        return res.send(error.original.sqlMessage);
                    });
                }else{
                    res.status(500);
                    return res.send("El usuario " + body.usuario + " no puede modificar los pedidos porque no tiene el rol Administrador");
                }
            });
    }

    obtenerPedidosCliente  = (req, res) => {
        const query = "SELECT * from PEDIDOS where username = ?";
        req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [req.params.username]}).then(
            function(pedidos){
                return res.json(pedidos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }
}

const pedido = new PedidoController();

module.exports = {pedido}