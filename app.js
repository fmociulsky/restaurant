const express = require('express');
const usuariosRouter = require("./routes/usuariosRouter");
const rolesRouter = require("./routes/rolesRouter");
const productosRouter = require("./routes/productosRouter");
const pedidosRouter = require("./routes/pedidosRouter");
const Sequelize = require("sequelize");
//const sequelize = require("./conection");
require('dotenv').config();

var app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(conectar);

app.use('/usuarios', usuariosRouter);
app.use('/roles', rolesRouter);
app.use('/productos', productosRouter);
app.use('/pedidos', pedidosRouter);



app.listen(port, () =>  {
    console.log('Servidor escuchando en el puerto ' + port)
})

function conectar(req, res, next){
    req.connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
        }
    });
    next();
}

