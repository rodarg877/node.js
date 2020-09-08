var mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', () => {
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
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });
});
describe('Bicicleta.createInstance', function () {
    it('crea una instancia de Bicicleta', function () {
        var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

        expect(bici.code).toBe(1);
        expect(bici.color).toBe("verde");
        expect(bici.modelo).toBe("urbana");
        expect(bici.ubicacion[0]).toEqual(-34.5);
        expect(bici.ubicacion[1]).toEqual(-54.1);
    });
});

describe('Bicicleta.allBicis', function () {
    it('comienza vacía', function () {
        Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(0);
        });
    });
});

describe('Bicicleta.add', () => {
    it('agrega solo una bici', (done) => {
        var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });

        Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toEqual(1);
                expect(bicis[0].code).toEqual(aBici.code);

                done();
            });
        });
    });
});

describe('Bicicleta.findByCode', function () {
    it('debe devolver la bici con code 1', function (done) {
        Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(0);
        });

        var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
        Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);
        });
            var aBici2 = new Bicicleta({ code: 2, color: "rojo", modelo: "urbana" });

            Bicicleta.add(aBici2, function (err, newBici) {
                if (err) console.log(err);
            });
                Bicicleta.findByCode(1, function (err, targetBici) {
                    expect(targetBici.code).toBe(aBici.code);
                    expect(targetBici.color).toBe(aBici.color);
                    expect(targetBici.modelo).toBe(aBici.modelo);

                    done();
                });
            });
        });



describe('Bicicleta.removeByCode', function () {
    it('debe devolver la bici con code 1', function (done) {
        Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(0);
        });

        var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
        Bicicleta.add(aBici, function (err, newBici) {
            if (err) console.log(err);
        });

        Bicicleta.allBicis(function (err, bicis) {
            expect(bicis.length).toBe(1);
        });

        Bicicleta.removeByCode(1, function (err, success) {
            if (err) console.log(err);

            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
            });
        })
    });
});