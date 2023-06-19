import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductoComponent} from '../../modales/modal-producto/modal-producto.component';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements AfterViewInit, OnInit{
  columnasTabla: string[] = ['Nombre', 'DescripcionCategoria', 'Marca', 'StockActual', 'StockMinimo', 'PrecioCosto', 'PrecioVenta', 'Estado', 'Acciones'];
  dataListaProductos = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private productoServicio: ProductoService,
    private utilidadServicio: UtilidadService,
    public dialog: MatDialog){}
 
  obtenerProductos(){
    this.productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data.value);
          this.dataListaProductos.data = data.value
        } else {
          this.utilidadServicio.mostrarAlerta("No se encontraron datos", "Ops!")
        }
      },
      error: (e) => {}
    })
  }

  ngAfterViewInit() {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLowerCase();
  }

  nuevoProducto() {
    this.dialog.open(ModalProductoComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerProductos();
      }
    })
  }

  editarProducto(producto: Producto) {
    this.dialog.open(ModalProductoComponent, {
      disableClose:true,
      data: producto
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerProductos();
      }
    })
  }

  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.productoServicio.eliminar(producto.idProducto).subscribe({
          next:(data) => {
            if (data.status) {
              this.utilidadServicio.mostrarAlerta("El producto fue eliminado", "Listo");
              this.obtenerProductos();
            } else this.utilidadServicio.mostrarAlerta("No se pudo eliminar el producto", "Error");    
          }, error: (e) => {console.log(e)}
        });
      }
    })
  }
}
