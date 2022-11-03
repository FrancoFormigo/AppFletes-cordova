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
function obtenerRolesUsuario(dtoUsuario) {
	//Define una variable para recibir la respuesta de la lectura	
	var resp_leer_rol = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el idUsuario y el objeto de tipo Array como parametro y recibe una String
	resp_leer_rol = leer_por_dni(dtoUsuario);
	//	alert (resp_leer_roles);
	//Si no se pudo conectar retorna "4"
	if (resp_leer_rol == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (resp_leer_rol != "ok") {
		return "1";
	} else {
		return "2";
	}
}

function mostrarMenuAdecuado(dtoUsuario) {
	//Define una variable para recibir la respuesta de la lectura	
	var resp_leer_rol = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el idUsuario y el objeto de tipo Array como parametro y recibe una String
	resp_leer_rol = leer_por_dni(dtoUsuario);
	//	alert (resp_leer_roles);
	//Si no se pudo conectar retorna "4"
	if (resp_leer_rol == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (resp_leer_rol != "ok") {
		return "1";
	} else {
		return "2";
	}
}

function obtenerPedidos() { 
	//Llama a la "dao" para que acceda al webservice 
	//Envia el idUsuario y el objeto de tipo Array como parametro y recibe una String
	var respuesta = obtenerPedidosClientes();
	//	alert (resp_leer_roles);
	//Si no se pudo conectar retorna "4"
	if (respuesta['estado'] == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (respuesta['estado'] != "ok") {
		return "1";
	} else {
		alert("Estoy en obtener pedidos NEGOCIO volviendo de dao");
		return respuesta;
	}
}

