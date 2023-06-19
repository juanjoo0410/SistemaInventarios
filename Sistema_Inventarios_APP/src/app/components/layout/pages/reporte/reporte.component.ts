import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";
import { Reporte } from 'src/app/interfaces/reporte';
import { VentaService } from 'src/app/services/venta.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

export const MY_DATA_FORMATS={
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class ReporteComponent implements OnInit, AfterViewInit{

  formFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['FechaRegistro', 'NumeroVenta', 'TipoPago', 'Total', 'Producto', 'Cantidad', 'Precio', 'TotalProducto'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private formB: FormBuilder,
    private ventaServicio: VentaService,
    private utilidadServicio: UtilidadService
  ){
    this.formFiltro = this.formB.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  buscarVentas(){
    const fechaInicio = moment(this.formFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const fechaFin = moment(this.formFiltro.value.fechaFin).format('DD/MM/YYYY');
    if (fechaInicio === "Invalid date" || fechaFin === "Invalid date"){
      this.utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas","Ups!");
      return;
    }
    this.ventaServicio.reporte(
      fechaInicio,
      fechaFin
    ).subscribe({
      next: (data) => {
        if (data.status){
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value;
        }
        else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this.utilidadServicio.mostrarAlerta("No se encontraron datos", "Ops!")
        }
      },
      error: (e) => {}
    })
  }

  exportarExcel(){
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, "ReporteVentas.xlsx")
  }
}
