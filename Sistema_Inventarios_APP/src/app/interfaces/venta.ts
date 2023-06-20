import { DetalleVenta } from "./detalle-venta";

export interface Venta {
    idVenta?: number,
    numeroDocumento?: string,
    nombreCliente: string,
    tipoPago: string,
    totalTxt: string,
    fechaRegistro?: string,
    detalleVenta: DetalleVenta[]
}
