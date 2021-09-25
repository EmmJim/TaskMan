const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req, res, next) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en TaskMan'
    })
}
exports.formIniciarSesion = (req, res, next) => {
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en TaskMan',
        error
    })
}

exports.crearCuenta = async(req, res, next) => {

    const {email, password} = req.body;

    try {
        await Usuarios.create({
            email, 
            password
        });

        //Crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario
        const usuario = {
            email
        }

        //Enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta TaskMan',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        //Redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            nombrePagina: 'Crear cuenta en TaskMan',
            mensajes: req.flash(),
            email,
            password
        })
    }
    

} 

exports.formRestablecerPassword = (req, res, next) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

exports.confirmarCuenta = async (req, res, next) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'Esa cuenta no existe');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;

    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');
}