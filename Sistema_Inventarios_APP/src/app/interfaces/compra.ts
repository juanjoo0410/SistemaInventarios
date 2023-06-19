import { DetalleCompra } from "./detalle-compra";

export interface Compra {
    idCompra?: number,
    numeroDocumento?: string,
    nombreProveedor?: string,
    totalTxt: string,
    fechaRegistro?: string,
    detalleCompra: DetalleCompra[]
}