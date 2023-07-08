import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];
  listaProductosParaVenta: DetalleVenta[] = [];
  bloquearBotonRegistrar: boolean = false;
  productoSeleccionado!: Producto;
  tipoPagoPorDefecto: string = "Efectivo";
  totalPagar: number = 0;
  formProductoVenta!: FormGroup;
  columnasTabla: string[] = ['Producto', 'Cantidad', 'Precio', 'Total', 'Accion'];
  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
  nombreCliente: string = "";

  constructor(
    private formB: FormBuilder,
    private productoServicio: ProductoService,
    private ventaServicio: VentaService,
    private utilidadServicio: UtilidadService
  ){
    this. formProductoVenta = this.formB.group({
      producto: ["", Validators.required],
      cantidad: ["", Validators.required],
    });

    this.productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          const lista = data.value as Producto[];
          this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock > 0);
        }
      },
      error: (e) => {}
    });

    this.formProductoVenta.get('producto')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value);
    });
  }

  ngOnInit(): void {
    
  }

  retornarProductosPorFiltro(busqueda: any): Producto[]{
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLocaleLowerCase() : busqueda.nombre.toLocaleLowerCase();
    return this.listaProductos.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado));
  }

  mostrarProducto(producto: Producto): string {
    return producto.nombre;
  }

  productoParaVenta(event: any){
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaVenta(){
    const cantidad: number = this.formProductoVenta.value.cantidad;
    if (cantidad <= this.productoSeleccionado.stock){
      const precio: number = parseFloat(this.productoSeleccionado.precioVentaTxt);
      const total: number = cantidad * precio;
      this.totalPagar = this.totalPagar + total;
      this.listaProductosParaVenta.push({
        idProducto: this.productoSeleccionado.idProducto,
        descripcionProducto: this.productoSeleccionado.nombre,
        cantidad: cantidad,
        precioTxt: String(precio.toFixed(2)),
        totalTxt: String(total.toFixed(2))
      });

      this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
      this.formProductoVenta.patchValue({
        producto: "",
        cantidad: ""
      })
    }
    else{
      this.utilidadServicio.mostrarAlerta("No hay suficiente stock", "Ups!");
    }
  }

  eliminarProducto(detalle: DetalleVenta){
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTxt),
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(p => p.idProducto != detalle.idProducto);
    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
  }

  registrarVenta(){
    if(this.listaProductosParaVenta.length > 0 && this.nombreCliente != ""){
      this.bloquearBotonRegistrar = true;
      const request: Venta = {
        nombreCliente: this.nombreCliente,
        tipoPago: this.tipoPagoPorDefecto,
        totalTxt: String(this.totalPagar.toFixed(2)),
        detalleVenta: this.listaProductosParaVenta
      }
      this.ventaServicio.registrar(request).subscribe({
        next: (response) =>{
          if (response.status){
            console.log(response.value);
            this.totalPagar = 0.00;
            this.listaProductosParaVenta = [];
            this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
            Swal.fire({
              icon: 'success',
              title: 'Venta Registrada!',
              text: `Numero de venta ${response.value.numeroDocumento}`
            })
          }else {
            this.utilidadServicio.mostrarAlerta("No se pudo registrar la venta", "Ops!");
          }
        },
        complete:() => {
          this.nombreCliente = "";
          this.bloquearBotonRegistrar = false;
        },
        error: (e) =>{}
      });
    } else{
      this.utilidadServicio.mostrarAlerta("Tiene que agregar el nombre del Cliente", "Ups!");
    }
  }
}
