
var mymap = L.map('mapid').setView([-34.6343603, -58.4059233,15], 13);



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(mymap);