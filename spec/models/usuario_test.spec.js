var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');
const bicicleta = require('../../models/bicicleta');


describe('Testing usuarios', () => {
    beforeEach((done) => {
        const mongoDB = 'mongodb://localhost:27017/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('We are connected to test database');
            done();
        });
    });
    afterEach((done) => {
        Reserva.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function (err, success) {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function (err, success) {
                    if (err) console.log(err);
                    done();
                });
            });
        });
    });
    describe('Cuando un usuario reserva una bici', function () {
        it('debe existir una reserva', (done) => {
            var usuario = new Usuario({ nombre: 'Rodrigo' });
            usuario.save(usuario);
            var bici = new Bicicleta({ code: 1, color: "rojo", modelo: "urban" });
            bici.save(bici);
            var hoy = new Date();
            var mañana= new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reserva(bicicleta.id, hoy, mañana, function(err,reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                    console.log(reservas[0]  );
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre)
                    done();
                });
            });
        });
    });
})