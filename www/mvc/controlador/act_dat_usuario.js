// Para probar correcto funcionamiento de alguna linea insertar dentro de la funcion
// alert("funciona");

$('#btRetornar').click(function () {
    history.back();
});

$('#btGuardar').click(function () {
    var inNombre = $('#inNombre');
    var nombre = inNombre.val().trim();
    inNombre.val(nombre);

    var inRol = $("input[type=radio][name=inRol]:checked");
    var rol = inRol.val().trim();
    inRol.val(rol);

    var inContrasenaActual = $('#inContrasenaActual');
    var contrasenaActual = inContrasenaActual.val().trim();
    inContrasenaActual.val(contrasenaActual);

    var inContrasenaNueva = $('#inContrasenaNueva');
    var contrasenaNueva = inContrasenaNueva.val().trim();
    inContrasenaNueva.val(contrasenaNueva);

    var inContrasenaReingresada = $('#inContrasenaReingresada');
    var contrasenaReingresada = inContrasenaReingresada.val().trim();
    inContrasenaReingresada.val(contrasenaReingresada);

    var res_validar_ingreso = validar_ingreso(dni, nombre, rol, contrasenaActual, contrasenaNueva, contrasenaReingresada);
    if (res_validar_ingreso == "1") {
        alert("Ingreso Incorrecto!");
        alert(contrasenaNueva + contrasenaActual + nombre);
    } else {
        if (res_validar_ingreso == "2") {
            window.location.href = "../vista/act_dat_usuario.html";
        } else {
            if (res_validar_ingreso == "3") {
                alert("Ingreso correcto!");
            } else {
                alert("Error!");
            }
        }
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var dni = "";
function obtenerUsuario() {
    dni = getParameterByName('usuario');
    alert("Usuario: " + dni);
    var nombre = obtenerNombreUsuario(dni);
    var inNombre = $('#inNombre');
    inNombre.val(nombre);
}
