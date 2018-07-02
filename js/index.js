var proxy = 'https://cors-anywhere.herokuapp.com/';
var api = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&";

var latitude;
var longitude;

$("#boton").click(function () {
    if (document.getElementById("txtCiudad").value === "" || document.getElementById("txtRadio").value === ""
        || document.getElementById("txtFechaInicio").value === "" || document.getElementById("txtFechaFin").value === "") {
        alert("Debe ingresar todos los campos");
    } else {
        
        var geocoder = new google.maps.Geocoder();
        var city = document.getElementById("txtCiudad").value;
        geocoder.geocode({ 'address': city }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                console.log(latitude + "," + longitude);
                obtenerModo();
            } else {
                console.log("Geocoder falló debido a: " + status);
                alert("Ingrese una ciudad válida")
            }
        });
    }
});

function obtenerModo() {

    var element = document.getElementById("selectModo");
    var modo = element.options[element.selectedIndex].text;
    console.log(modo);
    var urlString = proxy + api + "latitude=" + latitude + "&longitude=" + longitude +
        "&maxradiuskm=" + document.getElementById("txtRadio").value + "&starttime=" + document.getElementById("txtFechaInicio").value
        + "&endtime=" + document.getElementById("txtFechaFin").value + "&minmagnitude=4";
    var sumaCity = 0;

    switch (modo) {
        case "count":
            $.ajax({
                url: urlString
            }).then(function (data) {
                console.log(data)
                $('.txtRespuesta').text(parseFloat(data.metadata.count));
                console.log(parseFloat(data.features.length));
                console.log(data.metadata.count);
            });
            break;
        case "average":
            $.ajax({
                url: urlString
            }).then(function (data) {
                console.log(data)
                if (data.metadata.count === 0) {
                    $('.txtRespuesta').text(0);
                } else {
                    for (var i = 0; i < data.metadata.count; i++) {
                        sumaCity += data.features[i].properties.mag;
                        console.log(sumaCity);
                    }
                    var avgCity = sumaCity / data.metadata.count;
                    $('.txtRespuesta').text(parseFloat(avgCity));
                }
            });
            break;
        case "compare":
            var urlStringWorld = proxy + api + "starttime=" + document.getElementById("txtFechaInicio").value
                + "&endtime=" + document.getElementById("txtFechaFin").value + "&minmagnitude=4";
            var sumaWorld = 0;
            var avgCity = 0;
            var avgWorld = 0;

            $.ajax({
                url: urlString
            }).then(function (data) {
                console.log(data)
                if (data.metadata.count === 0) {
                    avgCity = 0;
                } else {
                    for (var i = 0; i < data.metadata.count; i++) {
                        sumaCity += data.features[i].properties.mag;
                    }
                    avgCity = sumaCity / data.metadata.count;
                    console.log("avgcity" + avgCity);
                }
            });


            $.ajax({
                url: urlStringWorld
            }).then(function (data) {
                console.log(data)
                for (var i = 0; i < data.metadata.count; i++) {
                    sumaWorld += data.features[i].properties.mag;
                }
                avgWorld = sumaWorld / data.metadata.count;
                console.log("avgcity" + avgWorld);
                var diferencia = (avgCity - avgWorld).toPrecision(5);
                console.log(diferencia);
                $('.txtRespuesta').text(parseFloat(diferencia));
            });
            break;
        default:
            alert("Debe seleccionar una opción de MODO");
            break;

    }




}


