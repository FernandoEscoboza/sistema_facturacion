
const express = require('express');
const app = express();
const routerProductos = require('./routers/productos');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.port || 3000;

// Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

// // Routes
app.use('/productos', routerProductos );


// Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


app.listen(port, ()=>{
    
console.log('Run server');

} );
