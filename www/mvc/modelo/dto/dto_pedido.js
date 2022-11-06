
// "DTO" destinada a transportar los datos correspondientes a
// la tabla "Pedidos" del modelo. 
// Las columnas de la tabla son "id", "peso", "origen" y "destino"
// Contiene los metodos "set" y "get" para las 4 variables
// 
class DtoPedido {
    constructor(setId = 0, setPeso = 0,
        setOrigen = '', setDestino = '', setTelefono = '', setFletero = '') {
        this.id = setId;
        this.peso = setPeso;
        this.origen = setOrigen;
        this.destino = setDestino;
        this.telefono = setTelefono;
        this.Fletero = setFletero;
    }

    set setId(id) {
        this.id = id;
    }

    set setPeso(peso) {
        this.peso = peso;
    }

    set setOrigen(origen) {
        this.origen = origen;
    }

    set setDestino(destino) {
        this.destino = destino;
    }

    set setFletero(fletero) {
        this.fletero = fletero;
    }

    set setTelefono(telefono){
        this.telefono = telefono;
    }

    get getFletero() {
        return this.fletero;
    }

    get getId() {
        return this.id;
    }

    get getPeso() {
        return this.peso;
    }

    get getOrigen() {
        return this.origen;
    }

    get getDestino() {
        return this.destino;
    }

    get getTelefono() {
        return this.telefono;
    }

}