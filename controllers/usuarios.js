const Usuario = require('../models/usuario')
module.exports = {
    list: function (req, res, next) {
        Usuario.find({}, (err, usuarios) => {
            res.render('usuarios/index', { usuarios: usuarios });
        });
    },
    create_get: function (req, res, next) {
        res.render('usuarios/create', { errors: {}, usuario: new Usuario() });
    },
    create: function (req, res, next) {
        console.log("entra aqui")
        if (req.body.password != req.body.confirm_password) {
            console.log("error1")
            res.render('/usuarios/create', { errors: { confirm_password: { message: 'no coinciden los passwords ingresados' } }, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) })
            return; 
        }

        Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }, (err, nuevoUsuario) => {
            if (err) {
                console.log(err)
                res.render('/usuarios/create', { errors: err.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) })
                
            } else {
                console.log("hizo todo ok")
                nuevoUsuario.enviar_email_bienvenida(function(err){console.log(err)});
                res.redirect('/usuarios')
            }
        });
    },

    delete: function (req, res, next) {
        Usuario.findByIdAndDelete(req.body.id, (err) => {
            if (err) {
                next(err);
            } else {
                res.redirect('/usuarios')
            }
        })
    },

    update_get: function (req, res, next) {
        Usuario.findById(req.params.id, (err, usuario) => {
            res.render('usuarios/update', { errors: {}, usuario: usuario })
        });
    },

    update: function (req, res, next) {
        var updateValues = { nombre: req.body.nombre };
        Usuario.findByIdAndUpdate(req.params.id, updateValues, function(err, usuario) {
            if (err) {
                console.log(err);
                res.render('usuarios/update', { errors: err.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) })
            } else {
                res.redirect('/usuarios');
                return;
            }
        });
    }
}