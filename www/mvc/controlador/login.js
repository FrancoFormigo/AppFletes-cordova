// Para probar correcto funcionamiento de alguna linea insertar dentro de la funcion
// alert("funciona");

$('#btSalir').click(function () {
    navigator.app.exitApp();
});

$('#btIngresar').click(function () {
    var inUsuario = $('#inUsuario');
    var usuario = inUsuario.val().trim();
    inUsuario.val(usuario);

    var inContrasena = $('#inContrasena');
    var contrasena = inContrasena.val().trim();
    inContrasena.val(contrasena);

    var inRol = $("input[type=radio][name=inRol]:checked");
    var rol = inRol.val().trim();
    inRol.val(rol);


    //alert(usuario + contrasena + rol);
    var res_validar_ingreso = validar_ingreso(usuario, contrasena, rol);
    if (res_validar_ingreso == "1") {
        alert("Ingreso Incorrecto!");
    } else {
        if (res_validar_ingreso == "2") {
            alert("Ingreso Correcto!");
            window.location.href = '../vista/act_dat_usuario.html?usuario=' + usuario;
        } else {
            if (res_validar_ingreso == "3") {
                alert("Ingreso correcto!");
            } else {
                alert("Error!");
            }
        }
    }
});