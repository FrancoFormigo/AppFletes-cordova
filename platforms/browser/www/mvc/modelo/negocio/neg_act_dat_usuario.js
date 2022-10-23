//
// Logica de negocio correspondiente a la ventana "actualizacion de datos".
// Su funcion es la de nexo entre el controlador y las daos. 
// 

// Funcion destinada a obtener el nombre de un usuario x por su dni.
//
// Recibe como parametro el dni (desde el controlador)
//
// Retorna un dato de tipo string con el nombre del usuario si encontro,
// con un valor "1" si no lo encontro o con "4" si se produjo un error
//
function obtenerNombreUsuario(dni) {
	//Crea una instancia de DtoUsuario para transportar su informacion
	var usu_ingreso = new DtoUsuario();
	//Asigna el dni recibido como parametro al objeto creado	
	usu_ingreso.setDni = dni;
	//Define una variable para recibir la respuesta de la lectura	
	var resp_leer_usuario = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el objeto de tipo DtoUsuario como parametro y recibe una String
	resp_leer_usuario = leer_por_dni(usu_ingreso);
	//Si no se pudo conectar retorna "4"
	if (resp_leer_usuario == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (resp_leer_usuario != "ok") {
		return "1";
	} else {
		return usu_ingreso.getNombre;
	}
}

function obtenerRolUsuario(dni) {
	//Crea una instancia de DtoUsuario para transportar su informacion
	var usu_ingreso = new DtoUsuario();
	//Asigna el dni recibido como parametro al objeto creado	
	usu_ingreso.setRol = dni;
	//Define una variable para recibir la respuesta de la lectura	
	var resp_leer_usuario = "";
	//Llama a la "dao" para que acceda al webservice 
	//Envia el objeto de tipo DtoUsuario como parametro y recibe una String
	resp_leer_usuario = leer_por_dni(usu_ingreso);
	//Si no se pudo conectar retorna "4"
	if (resp_leer_usuario == "er") {
		return "4";
	}
	//Si no se pudo leer retorna "1"
	if (resp_leer_usuario != "ok") {
		return "1";
	} else {
		return usu_ingreso.getRol;
	}
}

// Funcion destinada a validar los datos ingresados, verificar
// si la contraseña actual es correcta y en caso de todo estar
// de acuerdo a la logica de negocio establecida modifica los datos.
//
// Recibe como parametro el dni, nombre, contrasenaActual,
// contrasenaNueva y contrasenaReingresada (desde el controlador)
//
// Retorna un dato de tipo string con el valor "1" si los datos 
// no eran correctos, "2" si modifico los datos del usuario, 
// "3" si no pudo modificar y "0" si se produjo un error
//
function validar_ingreso(dni, nombre, contrasenaActual, rol, contrasenaNueva, contrasenaReingresada) {
	//Define e inicializa una bandera en true, por cada dato si 
	//es incorrecto le asigna false, por lo tanto si llega al
	//final de las validaciones en true significa que todos los 
	//datos fueron correctos.
	var datos_correctos = true;
	//Nombre vacio	
	if (nombre == "") {
		datos_correctos = false;
	}
	if (rol == "") {
		datos_correctos = false;
	}
	//Contraseña actual vacia
	if (contrasenaActual == "") {
		datos_correctos = false;
	}
	//Primer ingreso del usuario y contrasenaNueva vacia
	if (contrasenaActual == dni && contrasenaNueva == "") {
		datos_correctos = false;
	}
	//ContrasenaNueva distinta de la contrasenaReingresada
	if (contrasenaNueva != contrasenaReingresada) {
		datos_correctos = false;
	}
	//Si ingresa una nueva contraseña invoca a una funcion para
	//ver si la misma contiene los caracteres que se requieren como
	//minimo para considerarla valida
	if (contrasenaNueva != "") {
		if (!contrasenaValida(contrasenaNueva)) {
			datos_correctos = false;
		}
	}
	//Si hasta aqui fueron todos datos validos, solicita a la "dao"
	//la lectura del usuario en la base para verificar si la 
	//contraseña actual coincide con la guardada en la base de datos. 
	if (datos_correctos) {
		var usu_ingreso = new DtoUsuario();
		usu_ingreso.setDni = dni;
		var resp_leer_usuario = "";
		resp_leer_usuario = leer_por_dni(usu_ingreso);
		if (resp_leer_usuario == "er") {
			return "4";
		}
		// if (resp_leer_usuario != "ok" || sha256(contrasenaActual) != usu_ingreso.getContrasena) {
		if (resp_leer_usuario != "ok" || contrasenaActual != usu_ingreso.getContrasena) {
			datos_correctos = false;
		}

	}
	//Si hasta aqui fueron todos datos validos, solicita a la "dao"
	//la modificaion del usuario 
	if (!datos_correctos) {
		return "1";
	} else {
		usu_ingreso.setNombre = nombre;
		if (contrasenaNueva != "") {
			//usu_ingreso.setContrasena = sha256(contrasenaNueva);
			usu_ingreso.setContrasena = contrasenaNueva;
		}
		if (rol != "") {
			usu_ingreso.setRol = rol;
		}
		var resp_mod_usuario = "";
		resp_mod_usuario = modif_por_id(usu_ingreso);
		if (resp_mod_usuario == "ok") {
			return "2";
		} else {
			return "3";
		}
	}
}

// Funcion destinada a validar la contraseña respecto a la regla 
// de negocio establecida.
// La contraseña debe contener solo letras mayusculas, letras
// minusculas y numero. 
// Como minimo debe tener un numero, una mayuscula y una minuscula.
//
// Recibe como parametro la contrasenaNueva a validar
//
// Retorna un dato de tipo boolean en true si es valida o en false
// si no lo es. 
//
function contrasenaValida(contrasenaNueva) {
	//Define e inicializa 3 contadores
	var cont_num = 0;
	var cont_may = 0;
	var cont_min = 0;
	//Recorre la contraseña byte a byte y por cada uno de ellos
	//suma en el contador correspondiente (si es un caracter invalido
	//no suma en ningun contador
	for (var i = 0; i < contrasenaNueva.length; i++) {
		var caracter = contrasenaNueva.charAt(i);
		if (caracter >= "0" && caracter <= "9") {
			cont_num = cont_num + 1;
		} else {
			if (caracter >= "A" && caracter <= "Z") {
				cont_may = cont_may + 1;
			} else {
				if (caracter >= "a" && caracter <= "z") {
					cont_min = cont_min + 1;
				}
			}
		}
	}
	//Verifica que los 3 contadores tengan un valor mayor a ceros y
	//que la suma de los 3 coincida con la longitud de la contraseña
	//(esto ultimo para asegurar que no contiene caracteres invalidos)
	if (cont_may > 0 && cont_min > 0 && cont_num > 0 && contrasenaNueva.length == cont_may + cont_min + cont_num) {
		return true;
	} else {
		return false;
	}
}