$(function () {
    $("form[name='forma']").validate({
        rules: {
            txtCiudad: {
                required: true,
                minlength: 5
            },
            txtRadio: {
                required: true,
                min: 1,
                max: 20001

            },
            txtFechaInicio: {
                required: true,
                formatofecha: true,
                rangofecha: ["2017-01-01", "2018-03-18"]
            },
            txtFechaFin: {
                required: true,
                formatofecha: true,
                rangofecha: ["2017-01-01", "2018-03-18"]
            }
        },
        messages: {
            txtCiudad: {
                required: "Debe ingresar una ciudad",
                minlength: "La ciudad debe ser de al menos longitud de 5 caracteres",
            },
            txtRadio: {
                required: "Debe ingresar un radio",
                min: "Ingrese un valor mayor a 0",
                max: "Puede ingresar un valor hasta 20001"
            },
            txtFechaInicio: {
                required: "Debe ingresar una fecha de inicio",
                formatofecha: "Ingrese la fecha en el formato yyyy-mm-dd",
                rangofecha: "La fecha puede ser entre {0} y {1}"
            },
            txtFechaFin: {
                required: "Debe ingresar una fecha de fin",
                formatofecha: "Ingrese la fecha en el formato yyyy-mm-dd",
                rangofecha: "La fecha puede ser entre {0} y {1}"
            }
        },
    });

    $.validator.addMethod(
        "formatofecha", function (value, element) {
            return value.match(/^\d\d\d\d?\-\d\d?\-\d\d$/);
        },
        "Ingrese la fecha en el formato yyyy-mm-dd"
    );

    $.validator.addMethod("rangofecha", function (value, element, arg) {
        if (this.optional(element) && !value) {
            return true;
        }

        var startDate = Date.parse(arg[0]),
            endDate = Date.parse(arg[1]),
            enteredDate = Date.parse(value);

        if (isNaN(enteredDate)) {
            return false;
        }

        return ((isNaN(startDate) || (startDate <= enteredDate)) &&
            (isNaN(endDate) || (enteredDate <= endDate)));

    }, $.validator.format("La fecha puede ser entre {0} y {1}"))



});