const Bicicleta =function (id, color, modelo, ubicacion) {
    this.id = id;
        this.color = color;
        this.modelo = modelo;
        this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function (){
    return 'id: ' + this.id + " | color: " + this.color;
}

Bicicleta.allBicis= [];

Bicicleta.add= (aBici) =>{
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById= function (aBiciId){
    var aBici= Bicicleta.allBicis.filter(x=> x.id== aBiciId)
if (aBici) {
    return aBici[0];
} else {
    throw new Error (`no existe una bicicleta con el id ${aBici}`);
}
}

Bicicleta.removeById = function(aBiciId){
    var i = Bicicleta.allBicis.indexOf(Bicicleta.findById(aBiciId));
    Bicicleta.allBicis.splice(i, 1);

}

var a = new Bicicleta ( 1, 'rojo', 'urbana', [34.6012424,58.3861497]);
var b = new Bicicleta ( 2, 'blanca', 'urbana', [34.596932,58.3808287]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
