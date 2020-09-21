const Bicicleta = require('../models/bicicleta')


exports.bicicleta_list =function (req, res){
    Bicicleta.allBicis((err, bicis) => {
        res.render("bicicletas/index", { bicis: bicis });
      });
    };
exports.bicicleta_create_get =function (req, res){
    res.render('bicicletas/create')
};
exports.bicicleta_create_post =function (req, res){
    var bici = new Bicicleta();
    bici.code = req.body.code,
        bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
   Bicicleta.add(bici);
   res.redirect('/bicicletas')
};

exports.bicicleta_delete_post =function (req, res){
    Bicicleta.removeByCode(req.params.code, (err) => {
        if(err){console.log(err)}
      res.redirect('/bicicletas')
    })
 };

 exports.bicicleta_update_get =function (req, res){
  Bicicleta.findByCode(req.params.code, (err, bici) => {
    console.log(bici.color)
    res.render('bicicletas/update', {bici});
  });
  
};
exports.bicicleta_update_post =function (req, res){
   Bicicleta.updateByCode(req.params.code,req.body.color, req.body.modelo, req.body.lat, req.body.lng, (err) => {
   if(err){console.log(err)}
   res.redirect('/bicicletas')
   });
};