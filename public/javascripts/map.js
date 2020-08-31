
var map = L.map('mapid').setView([-34.6343603, -58.4059233,15], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



$.ajax({
    dataType: 'json',
    url:'api/bicicletas',
    success: function (result){
        console.log(result)
        result.bicicleta.forEach(bici => {
            console.log (bici)
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map)
        });
    }
})