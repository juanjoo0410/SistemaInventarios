import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { ModalDetalleVentaComponent } from '../../modales/modal-detalle-venta/modal-detalle-venta.component';
import { Venta } from 'src/app/interfaces/venta';
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
  selector: 'app-historial-venta',
  templateUrl: './historial-venta.component.html',
  styleUrls: ['./historial-venta.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class HistorialVentaComponent implements OnInit, AfterViewInit {
  formBusqueda: FormGroup;
  opcionesBusqueda: any[] = [
    {value: "fecha", descripcion: "Por fechas"},
    {value: "numero", descripcion: "Numero venta"}
  ];
  columnasTabla: string[] = ['FechaRegistro', 'NumeroDocumento', 'TipoPago', 'Total', 'Accion'];
  dataInicio: Venta[] = [];
  datosListaVenta= new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private formB: FormBuilder,
    private dialog: MatDialog,
    private ventaServicio: VentaService,
    private utilidadServicio: UtilidadService
  ){
    this.formBusqueda = this.formB.group({
      buscarPor: ['fecha'],
      numero: [''],
      fechaInicio: [''],
      fechaFin: ['']
    })

    this.formBusqueda.get("buscarPor")?.valueChanges.subscribe(value => {
      this.formBusqueda.patchValue({
        numero: "",
        fechaInicio: "",
        fechaFin: ""
      })
    })
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosListaVenta.filter = filterValue.trim().toLowerCase();
  }

  buscarVentas(){
    let fechaInicio: string = "";
    let fechaFin: string = "";
    if (this.formBusqueda.value.buscarPor === "fecha"){
      fechaInicio = moment(this.formBusqueda.value.fechaInicio).format('DD/MM/YYYY');
      fechaFin = moment(this.formBusqueda.value.fechaFin).format('DD/MM/YYYY');
      if (fechaInicio === "Invalid date" || fechaFin === "Invalid date"){
        this.utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas","Ups!");
        return;
      }
    }
    this.ventaServicio.historial(
      this.formBusqueda.value.buscarPor,
      this.formBusqueda.value.numero,
      fechaInicio,
      fechaFin
    ).subscribe({
      next: (data) => {
        if (data.status) {
          this.dataInicio = data.value;
          this.datosListaVenta.data = data.value;
        }
        else{
          this.dataInicio = [];
          this.datosListaVenta.data = [];
          this.utilidadServicio.mostrarAlerta("Nose encontraron datos", "Ops!")
        }
      },
      error: (e) => {}
    })
  }

  verDetalleVenta(venta: Venta){
    this.dialog.open(ModalDetalleVentaComponent, {
      data: venta,
      disableClose: true,
      width: '700px'
    })
  }

  ngAfterViewInit(): void {
    this.datosListaVenta.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {

  }

}
