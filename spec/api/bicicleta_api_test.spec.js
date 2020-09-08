/* var Bicicleta = require('../../models/bicicleta')
var request = require('request');
server = require('../../bin/www')
var mongoose = require('mongoose');

var base_url = "http://localhost:3000/api/bicicletas";

describe('Bicicleta.API', () => {
    beforeEach(function(done){
        var mongoDB= 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,  {useNewUrlParser: true, useUnifiedTopology: true});
        const db = mongoose.connection;
        db.on('error',console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('we are connected');
            done();
        })
    })

    afterEach(function (done) {
        Bicicleta.deleteMany({},function (err, success) {
            if (err) console.log(err)
        })
        
    })
    describe('GET BICICLETA /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
            Bicicleta.add(a);
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETA /create', () => {
        it('Status 200', (done) => {
            var headers = { "content-type": "application/json" }
            var aBici =' { "id": 10, "color": "verde", "modelo": "urban", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url:base_url + '/create',
                body: aBici,
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("verde")
                done()
            });
        });
    });

    describe('DELETE BICICLETA /delete', () => {
        it('Status 204', (done) => {
            var headers = { "content-type": "application/json" }
            var aBici =' { "id": 10 }';
            var a = new Bicicleta(10, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
            Bicicleta.add(a);
            request.delete({
                headers: headers,
                url:base_url + '/delete',
                body: aBici,
            }, function (error, response, body) {
                expect(response.statusCode).toBe(204);
                done()
            })
        });
    })

    describe('POST BICICLETA /update', () => {
        it('Status 200', (done) => {
            var headers = { "content-type": "application/json" }
            var aBici =' { "id": 1, "color": "verde", "modelo": "urban", "lat": -34, "lng": -54 }';
            var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
            Bicicleta.add(a);
            request.post({
                headers: headers,
                url:base_url + '/update',
                body: aBici,
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("verde")
                done()
            });
        });
    });
})
 */