import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriaComponent } from '../../modales/modal-categoria/modal-categoria.component';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements AfterViewInit, OnInit{
  columnasTabla: string[] = ['Nombre', 'Sku', 'Estado', 'Acciones'];
  dataListaCategoria = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private categoriaServicio: CategoriaService,
    private utilidadServicio: UtilidadService,
    public dialog: MatDialog){}
 
  obtenerCategorias(){
    this.categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data.value);
          this.dataListaCategoria.data = data.value
        } else {
          this.utilidadServicio.mostrarAlerta("No se encontraron datos", "Ops!")
        }
      },
      error: (e) => {}
    })
  }

  ngAfterViewInit() {
    this.dataListaCategoria.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCategoria.filter = filterValue.trim().toLowerCase();
  }

  nuevaCategoria() {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerCategorias();
      }
    })
  }

  editarCategoria(categoria: Categoria) {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose:true,
      data: categoria
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerCategorias();
      }
    })
  }

  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: '¿Desea eliminar la categoria?',
      text: categoria.nombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.categoriaServicio.eliminar(categoria.idCategoria).subscribe({
          next:(data) => {
            if (data.status) {
              this.utilidadServicio.mostrarAlerta("La categoria fue eliminado", "Listo");
              this.obtenerCategorias();
            } else this.utilidadServicio.mostrarAlerta("No se pudo eliminar la categoria", "Error");    
          }, error: (e) => {console.log(e)}
        });
      }
    })
  }

}
