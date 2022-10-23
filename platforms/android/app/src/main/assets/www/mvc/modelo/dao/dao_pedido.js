
// "DAO" destinada a contener todos los accesos a la tabla "Pedidos"
// del modelo. 
// No contiene el acceso real (query a la tabla) porque la base
// se encuentra en un servidor remoto, por lo tanto lo que hace
// es invocar mediante "ajax" a scripts php para cada accion a 
// realizar.

// Funcion destinada a crear un pedido.
//
// Recibe como parametro un "DTO" dentro del cual se encuentran los datos del pedido.
//
// Retorna una "señal" con el resultado del acceso al servidor y el 
// mismo DTO recibido como parametro con la informacion (si habia)
//
function cliente_crea_pedido(dtoPedido) {
    //Define la variable para responder si crea o no el pedido.
    //  Los valores posibles son "er" (error de conexion), "" (no creo el pedido),
    //  "ok" (creo el pedido)
    var resp_creacion_pedido = "";
    //Obtiene el dni del objeto recibido como parametro	
    peso = dtoPedido.getPeso;
    origen = dtoPedido.getOrigen;
    destino = dtoPedido.getDestino;
    //Pregunta si es numerico o vacio
    if (peso == "" || origen == "" || destino == "") {

    } else {
        //Arma el "post" para enviarlo por ajax
        var parametros = {
            "Peso": peso,
            "Origen": origen,
            "Destino": destino,
        };
        //Invoca a la url donde se encuentra el archivo "usuario_leer_por_dni.php"
        $.ajax({
            data: parametros,
            type: 'post',
            dataType: 'json',
            async: false,
            url: 'https://proyectos-franco.000webhostapp.com/Usuarios/cliente_crea_pedido.php',
            success: function (respuesta) {
                resp_creacion_pedido = respuesta['estado'];
            },
            error: function (jqXHR, textStatus, errorMessage) {
                respuestaNoRecibida(jqXHR, textStatus);
                resp_creacion_pedido="er";
            }
        });
    }
    return resp_creacion_pedido;

    //resp_leer_pedido = respuesta['estado'];
                //Completa la informacion del DTO con la respuesta del servidor
                //dtoPedido.setId = respuesta['Id'];
                //dtoUsuario.setPeso = respuesta['Peso'];
                //dtoUsuario.setOrigen = respuesta['Origen'];
                //dtoUsuario.setDestino = respuesta['Destino'];
}