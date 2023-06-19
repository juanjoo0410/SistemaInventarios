export interface Producto {
    idProducto: number,
    nombre: string,
    idCategoria: number,
    descripcionCategoria: string,
    marca: string,
    stock: number,
    stockMinimo: number,
    peso: string,
    precioCostoTxt: string,
    precioVentaTxt: string,
    esActivo: number
}
