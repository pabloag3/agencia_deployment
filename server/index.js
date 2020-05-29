// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'});

// const db = require('./config/database');
// db.authenticate()
//     .then(() => console.log('DB Conectada'))
//     .catch(error => console.log(error));

// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// anhadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica llamada public
app.use(express.static('public'));

// validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// muestra el anho actual y genera la ruta
app.use((req, res, next) => {
    // crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    console.log(res.locals);
    return next();
});

// ejecutamos el bodyParser
app.use(bodyParser.urlencoded({extended:true}));

// cargar las rutas
app.use('/', routes());

/** Puerto y host para la app **/
const host = process.env.HOST || '0.0.0.0';
const port = process.env.port || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});