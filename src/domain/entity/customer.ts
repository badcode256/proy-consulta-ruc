export class Customer {
    ruc: String
    razon_social: String
    estado: String
    condicion: String
    ubigeo: String
    tipo_via: String
    nombre_via: String
    codigo_zona: String
    tipo_zona: String
    numero: String
    interior: String
    lote: String
    departamento: String
    manzana: String
    kilometro: String


    constructor(data: any) {
        this.ruc = data.ruc
        this.razon_social = data.razon_social
        this.estado = data.estado
        this.condicion = data.condicion
        this.ubigeo = data.ubigeo
        this.tipo_via = data.tipo_via
        this.nombre_via = data.nombre_via
        this.codigo_zona = data.codigo_zona
        this.tipo_zona = data.tipo_zona
        this.numero = data.numero
        this.interior = data.interior
        this.lote = data.lote
        this.departamento = data.departamento
        this.manzana = data.manzana
        this.kilometro = data.kilometro



    }
}