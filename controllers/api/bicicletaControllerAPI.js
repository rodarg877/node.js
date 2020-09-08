const Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis(function (err, bicis) {
        res.status(200).json({ bicicleta: bicis });
    })
}

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta();
    bici.code = req.body.code,
        bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    })
};

exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeByCode(req.body.code, function (err) {
        res.status(204).send();
    });
}

exports.bicicleta_update = function (req, res) {
    Bicicleta.updateByCode(req.body.code, req.body.color, req.body.modelo, req.body.lat, req.body.lng, function (err, bicis) {
        res.status(200).json({
            bicicleta: bicis
        })
    })
};