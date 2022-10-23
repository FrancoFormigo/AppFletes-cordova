
// "DAO" destinada a contener todos los accesos a la tabla "Usuarios"
// del modelo. 
// No contiene el acceso real (query a la tabla) porque la base
// se encuentra en un servidor remoto, por lo tanto lo que hace
// es invocar mediante "ajax" a scripts php para cada accion a 
// realizar.

// Funcion destinada a obtener los datos de un usuario x por su dni.
//
// Recibe como parametro un "DTO" dentro del cual se encuentra el
// dni que se quiere leer
//
// Retorna una "señal" con el resultado del acceso al servidor y el 
// mismo DTO recibido como parametro con la informacion (si habia)
//
function leer_por_dni(dtoUsuario) {
    //Define la variable para responder si encontro o no el usuario
    //  Los valores posibles son "er" (error de conexion), "" (no encontro el usuario),
    //  "ok" (encontro al usuario)
    var resp_leer_usuario = "";
    //Obtiene el dni del objeto recibido como parametro	
    dni = dtoUsuario.getDni;
    //Pregunta si es numerico o vacio
    if (isNaN(dni) || dni == "") {

    } else {
        //Arma el "post" para enviarlo por ajax
        var parametros = {
            "Dni": dni,
        };
        //Invoca a la url donde se encuentra el archivo "usuario_leer_por_dni.php"
        $.ajax({
            data: parametros,
            type: 'post',
            dataType: 'json',
            async: false,
            url: 'https://proyectos-franco.000webhostapp.com/Usuarios/usuario_leer_por_dni.php',
            success: function (respuesta) {
                resp_leer_usuario = respuesta['estado'];
                //Completa la informacion del DTO con la respuesta del servidor
                dtoUsuario.setId = respuesta['Id'];
                dtoUsuario.setNombre = respuesta['Nombre'];
                dtoUsuario.setDni = respuesta['Dni'];
                dtoUsuario.setRol = respuesta['rol'];
                dtoUsuario.setContrasena = respuesta['Contrasena'];


            },
            error: function (jqXHR, textStatus, errorMessage) {
                respuestaNoRecibida(jqXHR, textStatus);
                resp_leer_usuario = "er";
            }
        });
    }
    return resp_leer_usuario;
}

//Funcion que se ejecuta si NO pudo conectarse con el servidor (error de conexion).
//
//Recibe como parametros las respuestas ajax ante el intento de conexion	
//
function respuestaNoRecibida(jqXHR, textStatus) {
    //Informa el error, esto es solo de prueba, ya que se recuerda que el modelo
    //no debe tener contacto con la vista	
    alert("Error de conexion, intente mas tarde");
    alert(textStatus + jqXHR.status);
}