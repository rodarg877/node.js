var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function (BiciId, desde, hasta, cb) {
    var reserva = new Reserva ({usuario: this._id, bicicleta: BiciId, desde: desde, hasta: hasta})
    console.log(reserva);
    reserva.save(cb);
}
usuarioSchema.statics.allUsers = function (cb) {
    return this.find({}, cb);
};

module.exports = mongoose.model('Usuario', usuarioSchema)