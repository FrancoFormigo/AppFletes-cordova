// Definicion de variables globales
var dni_logueado = "";
var idUsuario = "";
var rol = "";

// Boton actualizar datos (abre la ventana para tal fin)
$('#btCrearPedido').click(function () {
	var inPeso = $('#inPeso');
	var peso = inPeso.val().trim();
	inPeso.val(peso);

	var inOrigen = $('#inOrigen');
	var origen = inOrigen.val().trim();
	inOrigen.val(origen);

	var inDestino = $('#inDestino');
	var destino = inDestino.val().trim();
	inDestino.val(destino);

	alert(peso + origen + destino);
	var res_creacion_pedido = crearPedido(peso, origen, destino);
	if (res_creacion_pedido == "1") {
		alert("No se pudo crear el pedido!");
	} else {
		if (res_creacion_pedido == "2") {
			alert("Se creo el pedido!");
		} else {
			if (res_creacion_pedido == "3") {
				alert("ERROR");
			} else {
				alert("Error!");
			}
		}
	}
});

// Boton retornar
$('#btRetornar').click(retornar);
function retornar() {
	history.back();
}

// Boton actualizar datos (abre la ventana para tal fin)
$('#btActualizarDatos').click(actualizarDatos);
function actualizarDatos() {
	window.location.href = '../vista/act_dat_usuario.html?usuario=' + dni_logueado;
}

// Funcion que se ejecuta al abrirse la ventana,
// invoca a la funcion obtener usuario y lo muestra en la vista,
// solicitarRolesUsuario y cargarRoles
function inicializarVentana() {
	obtenerUsuario();
	document.getElementById("h1Usuario").innerHTML = "Usuario: " + dni_logueado;
	solicitarRolesUsuario();
	cargarRoles();
}

// Funcion para enviar al "select" de la vista un rol	
function agregarRol(texto, valor) {
	var op = document.createElement("option");
	op.value = valor;
	op.text = texto;
	s.appendChild(op);
}

// Funcion para solicitar el envio a la vista todos los roles disponibles obtenidos del modelo
function cargarRoles() {
	// Recorre el arreglo e invoca a la funcion agregarRol enviando la descripcion y id de cada rol
	for (var i = 0; i < arreglo_roles.length; i++) {
		agregarRol(arreglo_roles[i].getRolDescripcion, arreglo_roles[i].getIdRol);
	}

	// Hace visible en el "select" de la vista la primera de las opciones disponibles
	$(document).ready(function () {
		setTimeout(function () {
			$('select').val(arreglo_roles[0].getIdRol);
			$('select').trigger('change');
		}, 0)
	});
}

// Funcion para obtener roles existentes en la base de datos para el usuario
function solicitarRolesUsuario() {
	// Invoca a una funcion del modelo, que busca todos los roles asignados al usuario	
	var res_obtener_roles = obtenerRolesUsuario(idUsuario, arreglo_roles);

	// Verifica el resultado de la funcion anterior, si retorna 2 es correcto, cualquier
	// otro representa un error de conexion		
	if (res_obtener_roles != "2") {
		alert("ERROR!!!!");
	}
}

// Funcion para obtener un valor recibido por get
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Funcion que se ejecuta al abrirse la ventana
// obtiene el dni  y el id del get
function obtenerUsuario() {
	dni_logueado = getParameterByName('usuario');
	idUsuario = getParameterByName('id');
}