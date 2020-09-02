const Bicicleta = require('../models/bicicleta');

beforeEach(()=>{Bicicleta.allBicis=[];});

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('debe agregar 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe encontrar  id:1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
        Bicicleta.add(a);
        var b = new Bicicleta(2, 'verde', 'cross', [-34.6343603, -58.4059233]);
        Bicicleta.add(b);
        var bici = Bicicleta.findById(1);
        expect(bici.id).toBe(1);
        expect(bici.color).toBe(a.color);
        expect(bici.modelo).toBe(a.modelo);
        expect(bici.ubicacion).toEqual(a.ubicacion);
    });
}); 

describe('Bicicleta.remove', () => {
    it('debe borrar 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6343603, -58.4059233]);
        Bicicleta.add(a);
        var b = new Bicicleta(2, 'verde', 'cross', [-34.6343603, -58.4059233]);
        Bicicleta.add(b);
        expect(Bicicleta.allBicis.length).toBe(2);
        expect(Bicicleta.allBicis[0]).toBe(a);
        Bicicleta.removeById(1)
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(b);
    });
});