const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const {body} = require('express-validator');

module.exports = function() {
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );

    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.nuevoProyecto
    );

    router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.agregarNuevoProyecto
    );

    //Listar Proyecto
    router.get('/proyectos/:url',
        authController.usuarioAutenticado, 
        proyectosController.proyectoPorUrl
    );

    //Actualizar Proyecto
    router.get('/proyectos/editar/:id', 
        authController.usuarioAutenticado,    
        proyectosController.editarProyecto
    );
    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );

    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    //Editar estado de la tarea
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstado
    );

    //Eliminar tarea
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    //Confirmar correo
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar Sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Reestablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);

    

    return router;
}