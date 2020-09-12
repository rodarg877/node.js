var Usuario = require('../models/usuario');
var Token = require('../models/token');



module.exports = {
    confirmationGet: function (req, res, next) {
        var tok=req.params;
        console.log(tok)
        Token.findOne({ token: req.params.token }, function (err, token) {
            console.log(token)
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'no encontramos un usuario con este token o el mismo expiro debe realizar el pedido nuevamente' })
            Usuario.findById(token._userId, function (err, usuario) {
                if (!usuario) {return res.status(400).send({ msg: " no se encuentra usuario" });}
                if (usuario.veificado) {return res.redirect('/usuarios');}
                usuario.verificado = true;
                usuario.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.redirect('/')
                });
            });
        });
    },
}

