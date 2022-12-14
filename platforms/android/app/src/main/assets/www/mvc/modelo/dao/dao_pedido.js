
// "DAO" destinada a contener todos los accesos a la tabla "Pedidos"
// del modelo. 
// No contiene el acceso real (query a la tabla) porque la base
// se encuentra en un servidor remoto, por lo tanto lo que hace
// es invocar mediante "ajax" a scripts php para cada accion a 
// realizar.

//const { functions } = require("underscore");

// Funcion destinada a crear un pedido.
//
// Recibe como parametro un "DTO" dentro del cual se encuentran los datos del pedido.
//
// Retorna una "señal" con el resultado del acceso al servidor y el 
// mismo DTO recibido como parametro con la informacion (si habia)
//
function cliente_crea_pedido(dtoPedido, dtoCliente) {
    //Define la variable para responder si crea o no el pedido.
    //  Los valores posibles son "er" (error de conexion), "" (no creo el pedido),
    //  "ok" (creo el pedido)
    var resp_creacion_pedido = "";
    //Obtiene el dni del objeto recibido como parametro	
    dni = dtoCliente.getDni;
    peso = dtoPedido.getPeso;
    origen = dtoPedido.getOrigen;
    destino = dtoPedido.getDestino;
    //Pregunta si es numerico o vacio
    if (dni == "" || peso == "" || origen == "" || destino == "") {

    } else {
        //Arma el "post" para enviarlo por ajax
        var parametros = {
            "Dni": dni,
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
                resp_creacion_pedido = "er";
            }
        });
    }
    return resp_creacion_pedido;
}

function respuestaNoRecibida(jqXHR, textStatus) {
    //Informa el error, esto es solo de prueba, ya que se recuerda que el modelo
    //no debe tener contacto con la vista	
    alert("Error de conexion, intente mas tarde");
    alert(textStatus + jqXHR.status);
}

function leer_pedidos_de_cliente(dtoCliente) {
    //Define la variable para responder si encontro o no el usuario
    //  Los valores posibles son "er" (error de conexion), "" (no encontro el usuario),
    //  "ok" (encontro al usuario)
    var resp_leer_pedidos_de_cliente = "";
    //Obtiene el dni del objeto recibido como parametro	
    dni = dtoCliente.getDni;
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
                dtoUsuario.setRol = respuesta['Rol'];
                dtoUsuario.setContrasena = respuesta['Contrasena'];


            },
            error: function (jqXHR, textStatus) {
                respuestaNoRecibida(jqXHR, textStatus);
                resp_leer_usuario = "er";
            }
        });
    }
    return resp_leer_usuario;
}

function obtenerPedidosClientes() {
    //Invoca a la url donde se encuentra el archivo "usuario_leer_por_dni.php"
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: false,
        url: 'https://proyectos-franco.000webhostapp.com/Usuarios/fletero_listar_ofertas.php',
        success: function (respuesta) {
            //Completa la informacion del DTO con la respuesta del servidor
            /*
            dtoPedido.setId = respuesta['Id'];
            dtoPedido.setPeso = respuesta['Peso'];
            dtoPedido.setOrigen = respuesta['Origen'];
            dtoPedido.setDestino = respuesta['Destino'];
            dtoPedido.setTelefono = respuesta['Telefono'];
            */
            /*
             listaPedidos = [];
             respuesta.forEach((pedido) => {
                 dtoPedido.setId = pedido.ID;
                 dtoPedido.setPeso = pedido.Peso;
                 dtoPedido.setOrigen = pedido.Origen;
                 dtoPedido.setDestino = pedido.Destino;
                 dtoPedido.setTelefono = pedido.Telefono;
                 listaPedidos.push(dtoPedido)
             });
             */
            resp_obtener_pedidos_clientes = respuesta;
        },
        error: function (jqXHR, textStatus) {
            respuestaNoRecibida(jqXHR, textStatus);
            resp_obtener_pedidos_clientes = "er";
        }
    });
    //alert("Estoy en obtener pedidos clientes DAO");
    //var prueba = [{"estado":"" ,"Id":"1","Origen":"4 de enero 222","Destino":"San Martin 555","Peso":"32","Telefono":"33434343434"},{"estado":"" ,"Id":"2","Origen":"Mendoza 222","Destino":"Hipolito 555","Peso":"51","Telefono":"003402321243"}]
    //return prueba;
    //return resp_obtener_pedidos_clientes;
    return resp_obtener_pedidos_clientes;
}