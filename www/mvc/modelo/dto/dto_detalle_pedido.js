class DtoDetallePedido {
    constructor(setId = 0, setPeso = 0,
        setOrigen = '', setDestino = '',) {
        this.id = setId;
        this.peso = setPeso;
        this.origen = setOrigen;
        this.destino = setDestino;
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

}