// import { TemplatePortal } from "@angular/cdk/portal";

export interface ventas{
    idventas?: number,
    idcli?: number,
    iduser?: number,
    total?: number,
    idstatus_ventas?: number
}

export interface detventas{
    idventas?: number,
    idart?: number,
    cantidad?: number,
    prec_ventas?:number,
    importe?: number
}