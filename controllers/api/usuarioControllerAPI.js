const Bicicleta = require('../../models/bicicleta');
const Usuario = require('../../models/usuario');

exports.usuarios_list = function (req, res) {
    Usuario.allUsers((err, usuario) => {
        res.status(200).json({ usuarios: usuario })
    });
};


exports.usuarios_create = function (req, res) {
    var usuario = new Usuario({ nombre: req.body.nombre, email:req.body.email, password:req.body.password });
    usuario.save(function (err) {
        if(err)return res.status(500).json(err);
        res.status(200).json(usuario)
    })
};



exports.usuario_reservar = function (req, res) {
    Usuario.findById(req.body.id, function (err, usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function (err) {
            console.log('reservar');
            res.status(200).send();
        })
    })
};