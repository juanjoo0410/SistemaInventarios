import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { Producto } from 'src/app/interfaces/producto';
import Swal from 'sweetalert2';
import { DetalleCompra } from 'src/app/interfaces/detalle-compra';
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/interfaces/compra';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];
  listaProductosParaCompra: DetalleCompra[] = [];
  bloquearBotonRegistrar: boolean = false;
  productoSeleccionado!: Producto;
  totalPagar: number = 0;
  formProductoCompra!: FormGroup;
  columnasTabla: string[] = ['Producto', 'Cantidad', 'Precio', 'Total', 'Accion'];
  datosDetalleCompra = new MatTableDataSource(this.listaProductosParaCompra);
  nombreProveedor: string = "";

  constructor(
    private formB: FormBuilder,
    private productoServicio: ProductoService,
    private compraServicio: CompraService,
    private utilidadServicio: UtilidadService
  ){
    this. formProductoCompra = this.formB.group({
      producto: ["", Validators.required],
      cantidad: ["", Validators.required],
    });

    this.productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          const lista = data.value as Producto[];
          this.listaProductos = lista.filter(p => p.esActivo == 1);
        }
      },
      error: (e) => {}
    });

    this.formProductoCompra.get('producto')?.valueChanges.subscribe(value => {
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

  productoParaCompra(event: any){
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaCompra(){
    const cantidad: number = this.formProductoCompra.value.cantidad;
    const precio: number = parseFloat(this.productoSeleccionado.precioCostoTxt);
      const total: number = cantidad * precio;
      this.totalPagar = this.totalPagar + total;
      this.listaProductosParaCompra.push({
        idProducto: this.productoSeleccionado.idProducto,
        descripcionProducto: this.productoSeleccionado.nombre,
        cantidad: cantidad,
        precioTxt: String(precio.toFixed(2)),
        totalTxt: String(total.toFixed(2))
      });

      this.datosDetalleCompra = new MatTableDataSource(this.listaProductosParaCompra);
      this.formProductoCompra.patchValue({
        producto: "",
        cantidad: ""
      })
  }

  eliminarProducto(detalle: DetalleCompra){
    this.totalPagar = this.totalPagar - parseFloat(detalle.totalTxt),
    this.listaProductosParaCompra = this.listaProductosParaCompra.filter(p => p.idProducto != detalle.idProducto);
    this.datosDetalleCompra = new MatTableDataSource(this.listaProductosParaCompra);
  }

  registrarCompra(){
    if(this.listaProductosParaCompra.length > 0 && this.nombreProveedor != ""){
      this.bloquearBotonRegistrar = true;
      const request: Compra = {
        nombreProveedor: this.nombreProveedor,
        totalTxt: String(this.totalPagar.toFixed(2)),
        detalleCompra: this.listaProductosParaCompra
      }
      this.compraServicio.registrar(request).subscribe({
        next: (response) =>{
          console.log(response.value);
          if (response.status){
            this.totalPagar = 0.00;
            this.listaProductosParaCompra = [];
            this.datosDetalleCompra = new MatTableDataSource(this.listaProductosParaCompra);
            Swal.fire({
              icon: 'success',
              title: 'Compra Registrada!',
              text: `Numero de compra ${response.value.numeroDocumento}`
            })
          }else {
            this.utilidadServicio.mostrarAlerta("No se pudo registrar la compra", "Ups!");
          }
        },
        complete:() => {
          this.nombreProveedor = "";
          this.bloquearBotonRegistrar = false;
        },
        error: (e) =>{}
      });
    }
    else{
      this.utilidadServicio.mostrarAlerta("Tiene que agregar el nombre del Proveedor", "Ups!");
    }
  }
}
