//
// Logica de negocio correspondiente a la ventana "menu del sistema".
// Su funcion es la de nexo entre el controlador y las daos. 
//
// Solamente contempla la logica hasta que se muestra el menu,
// puede ser necesario ampliarla si se implementa con un menu real,
// este solamente tiene previsto mostrar el menu y finalizar.
// 

// Funcion destinada a obtener los roles habilitados para el usuario
// que ingresa al menu
//
// Recibe como parametro el id del usuario que ingresa y un arreglo
// vacio para llenar con los roles que desempeña en la empresa
//
// Retorna un dato de tipo string con el valor "2" si encontro roles,
// "1" si no los encontro o con "4" si se produjo un error. Si encontro
// retorna el arreglo con los roles disponibles
//
function crearPedido(dni, peso, origen, destino) {
	var pedido_creacion = new DtoPedido();
	var cliente_creador = new DtoUsuario();

	cliente_creador.setDni = dni;
	alert(cliente_creador.getDni);
	pedido_creacion.setPeso = peso;
	pedido_creacion.setOrigen = origen;
	pedido_creacion.setDestino = destino;

	//Define una variable para recibir la respuesta de la lectura	
	var resp_creacion_pedido = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el idUsuario y el objeto de tipo Array como parametro y recibe una String
	resp_creacion_pedido = cliente_crea_pedido(pedido_creacion, cliente_creador);
	//	alert (resp_leer_roles);
	//Si no se pudo conectar retorna "4"
	if (resp_creacion_pedido == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (resp_creacion_pedido != "ok") {
		return "1";
	} else {
		return "2";
	}
}

function listarPedidosDeCliente(dni) {
	var cliente = new DtoUsuario();
	var listaPedidos = [];
	cliente.setDni = dni;

	var susPedidos = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el idUsuario y el objeto de tipo Array como parametro y recibe una String
	susPedidos = cliente_crea_pedido(cliente, listaPedidos);
	//	alert (resp_leer_roles);
	//Si no se pudo conectar retorna "4"
	if (susPedidos == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (susPedidos != "ok") {
		return "1";
	} else {
		return "2";
	}
}