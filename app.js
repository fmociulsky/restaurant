const express = require('express');
const usuariosRouter = require("./routes/usuarios");
const rolesRouter = require("./routes/roles");
const productosRouter = require("./routes/productos");
const pedidosRouter = require("./routes/pedidos");
require('dotenv').config();

var app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/roles', rolesRouter);
app.use('/productos', productosRouter);
app.use('/pedidos', pedidosRouter);



app.listen(port, () =>  {
    console.log('Servidor escuchando en el puerto ' + port)
})

