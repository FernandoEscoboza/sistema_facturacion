
export interface productos {
    idart?:string,
    descart?:string,
    prec_compra?:any,
    prec_venta?:any
}

export interface stock{
    idart?: any,
    stock?:any,
    punto_reorden?:any,
    id_alm?:any
}

export interface almacen{
    idalm?:'',
    nom_alm?:'',
}
