import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta';
import { Venta } from 'src/app/interfaces/venta';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrls: ['./modal-detalle-venta.component.css']
})
export class ModalDetalleVentaComponent implements OnInit {
  fechaRegistro: string = "";
  numeroDocumento: string = "";
  tipoPago: string = "";
  total: string = "";
  detalleVenta: DetalleVenta[] = [];
  columnasTabla: string[] = ['Producto', 'Cantidad', 'Precio', 'Total'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public venta: Venta,
  ){
    this.fechaRegistro = venta.fechaRegistro!;
    this.numeroDocumento = venta.numeroDocumento!;
    this.tipoPago = venta.tipoPago;
    this.total = venta.totalTxt;
    this.detalleVenta = venta.detalleVenta;
  }

  ngOnInit(): void {
  }


}
