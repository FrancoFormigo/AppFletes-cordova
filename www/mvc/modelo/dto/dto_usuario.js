
// "DTO" destinada a transportar los datos correspondientes a
// la tabla "Usuarios" del modelo. 
// Las columnas de la tabla son "id", "nombre", "dni" y "contrasena"
// Contiene los metodos "set" y "get" para las 4 variables
// 
class DtoUsuario {
    constructor(setId = 0, setNombre = '',
        setDni = 0, setContrasena = '', setRol = '',) {
        this.id = setId;
        this.nombre = setNombre;
        this.dni = setDni;
        this.rol = setRol;
        this.contrasena = setContrasena;
    }

    set setId(id) {
        this.id = id;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }

    set setDni(dni) {
        this.dni = dni;
    }

    set setContrasena(contrasena) {
        this.contrasena = contrasena;
    }

    set setRol(rol) {
        this.rol = rol;
    }

    get getId() {
        return this.id;
    }

    get getNombre() {
        return this.nombre;
    }

    get getDni() {
        return this.dni;
    }

    get getContrasena() {
        return this.contrasena;
    }

    get getRol() {
        return this.rol;
    }

}	