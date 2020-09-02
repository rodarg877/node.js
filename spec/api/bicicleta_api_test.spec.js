var Bicicleta = require('../../models/bicicleta')
var request = require('request')
server = require('../../bin/www')


describe('Bicicleta.API', () => {
    describe('GET BICICLETA /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', function (error, response, body) {
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
                url: 'http://localhost:3000/api/bicicletas/create',
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
                url:'http://localhost:3000/api/bicicletas/delete',
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
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici,
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("verde")
                done()
            });
        });
    });
})
