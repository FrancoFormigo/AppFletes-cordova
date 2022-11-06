
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

	alert(obtenerUsuario());
	var res_creacion_pedido = crearPedido(obtenerUsuario(), peso, origen, destino);
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
$('#btMostrarPedidos').click(actualizarDatos);
function actualizarDatos() {
	window.location.href = '../vista/act_dat_usuario.html?usuario=' + obtenerUsuario();
}

// Funcion que se ejecuta al abrirse la ventana,
// invoca a la funcion obtener usuario y lo muestra en la vista,
// solicitarRolesUsuario y cargarRoles

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
	return getParameterByName('usuario');
}

