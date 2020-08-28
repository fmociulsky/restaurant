class ProductoController{
    listar  = (req, res) => {
        req.connection.query('SELECT * from PRODUCTOS',{type: req.connection.QueryTypes.SELECT}).then(
            function(productos){
                return res.json(productos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    listarHabilitados  = (req, res) => {
        req.connection.query('SELECT * from PRODUCTOS where activo = 1',{type: req.connection.QueryTypes.SELECT}).then(
            function(productos){
                return res.json(productos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    crear = (req, res) => {
        const body = req.body;
        const sql = "INSERT INTO PRODUCTOS (nombre, detalle, precio) VALUES (?, ?, ?)";
        req.connection.query(sql, {replacements: [body.nombre, body.detalle, body.precio]}).then(
            function (result) {
                return res.send("Producto insertado: " + body.nombre);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtener  = (req, res) => {
        req.connection.query('SELECT * from PRODUCTOS where id = ?',
        {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idProducto] }
        ).then(
            function(productos){
                return res.json(productos);
            }
        )
    }

    actualizar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE PRODUCTOS SET nombre = ?, detalle = ?, precio = ?, activo = ? where id = ?";
        req.connection.query(sql, {replacements: [body.nombre, body.detalle, body.precio, body.activo, body.id]}).then(
            function (result) {
                return res.send("Producto actualizado: " + body.nombre);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    deshabilitar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE PRODUCTOS SET activo = 0 where id = ?";
        req.connection.query(sql, {replacements: [req.params.idProducto]}).then(
            function (result) {
                return res.send("Producto deshabilitado: " + req.params.idProducto);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    habilitar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE PRODUCTOS SET activo = 1 where id = ?";
        req.connection.query(sql, {replacements: [req.params.idProducto]}).then(
            function (result) {
                return res.send("Producto habilitado: " + req.params.idProducto);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    eliminar = (req, res) => {
        const body = req.body;
        req.connection.query('SELECT * from PEDIDOS where idProducto = ?', {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idProducto] }
        ).then(function(result){
            if(result.length == 0){
                const sql = "DELETE from PRODUCTOS where id = ?";
                req.connection.query(sql, {replacements: [req.params.idProducto]}).then(
                    function (result) {
                        return res.send("Producto eliminado: " + req.params.idProducto);
                }).catch(error => {
                    console.log(error);
                    res.status(500);
                    return res.send(error.original.sqlMessage);
                });
            }else{
                res.status(500);
                return res.send("El Producto " + req.params.idProducto + " no se puede eliminar ya que se encuentra asignado a un pedido, puede deshabilitarlo");
            }
        });
    }
}

const producto = new ProductoController();

module.exports = {producto}