const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//Extraer valores de variables.env
require('dotenv').config({path: 'variables.env'});

//Crear la conexion
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

const app = express();

//Archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

//Direccion de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

//sessions nos permiten navegar entre distintas paginas sin volver a autenticar
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Añadir helpers a la aplicacion
app.use((req, res, next ) => {
    console.log(req.user)
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null
    next();
});

app.use('/', routes());

//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});

require('./handlers/email');