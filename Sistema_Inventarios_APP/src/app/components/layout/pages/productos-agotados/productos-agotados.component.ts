import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-productos-agotados',
  templateUrl: './productos-agotados.component.html',
  styleUrls: ['./productos-agotados.component.css']
})
export class ProductosAgotadosComponent implements AfterViewInit, OnInit{
  columnasTabla: string[] = ['Nombre', 'DescripcionCategoria', 'Marca', 'StockActual', 'StockMinimo', 'Estado'];
  dataListaProductos = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private productoServicio: ProductoService,
    private utilidadServicio: UtilidadService,
    public dialog: MatDialog){}
 
  obtenerProductosAgotados(){
    this.productoServicio.listaAgotados().subscribe({
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

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerProductosAgotados();
  }
}
