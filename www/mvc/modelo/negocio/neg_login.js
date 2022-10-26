//
// Logica de negocio correspondiente a la ventana "login".
// Su funcion es la de nexo entre el controlador y las daos. 
// 
//Crea una variable global, instancia de DtoUsuario
var usu_ingreso = new DtoUsuario();

// Funcion destinada a validar los datos ingresados, verificar
// si la contraseña es correcta y en caso de ser valida debe
// determinar si es la primera vez que el usuario ingresa al sistema
// para obligarlo a modificar su nombre y contraseña, si no es la
// primera vez debe mostrar el menu del sistema.
//
// Recibe como parametro el dni y la contrasena
//
// Retorna un dato de tipo string con el valor "1" si los datos 
// no eran correctos, "2" si es la primera vez que ingresa,
// "3" si esta permitido ingresar al menu del sistema y "4" si
// se produjo error de conexion
//
function validar_ingreso(dni, contrasena, rol) {

    //Asigna el dni recibido como parametro al objeto creado	
    usu_ingreso.setDni = dni;
    usu_ingreso.setRol = rol;
    //Define una variable para recibir la respuesta de la lectura	
    var resp_leer_usuario = "";
    //Llama a la "dao" para que acceda al webservice 
    //Envia el objeto de tipo DtoUsuario como parametro y recibe una String
    resp_leer_usuario = leer_por_dni(usu_ingreso);
    //Si no se pudo conectar retorna "4"
    if (resp_leer_usuario == "er") {
        return "4";
    }
    //Si no se pudo conectar retorna "1"
    if (resp_leer_usuario != "ok") {
        return "1";
    } else {
        //Si la contraseña ingresada esta vacia o es distinta a la de la tabla retorna "1"
        //		alert ("contraseña: " + sha256(contrasena));
        //if (contrasena == "" || sha256(contrasena) != usu_ingreso.getContrasena) {
        if (contrasena == "" || contrasena != usu_ingreso.getContrasena) {
            return "1";
        } else {
            //Si la contraseña es igual al dni retorna "2"
            if (dni == contrasena && usu_ingreso.getRol == rol) {
                return "2";
            } else if (usu_ingreso.getRol == rol) {
                return "3";
            } else if (usu_ingreso.getRol == rol)
                return "5";
        }
    }
}