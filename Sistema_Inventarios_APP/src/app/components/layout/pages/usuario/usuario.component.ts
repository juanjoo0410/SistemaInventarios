import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../../modales/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements AfterViewInit, OnInit {
  columnasTabla: string[] = ['NombreCompleto', 'Correo', 'RolDescripcion', 'Estado', 'Acciones'];
  //dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private usuarioServicio: UsuarioService,
    private utilidadServicio: UtilidadService,
    public dialog: MatDialog){}
 
  obtenerUsuarios(){
    this.usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuarios.data = data.value
        } else {
          this.utilidadServicio.mostrarAlerta("No se encontraron datos", "Ops!")
        }
      },
      error: (e) => {}
    })
  }

  ngAfterViewInit() {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario() {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerUsuarios();
      }
    })
  }

  editarUsuario(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true,
      data: usuario
    }).afterClosed().subscribe(resultado =>{
      if(resultado === 'true'){
        this.obtenerUsuarios();
      }
    })
  }

  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: usuario.nombreCompleto,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.usuarioServicio.eliminar(usuario.idUsuario).subscribe({
          next:(data) => {
            if (data.status) {
              this.utilidadServicio.mostrarAlerta("El usuario fue eliminado", "Listo");
              this.obtenerUsuarios();
            } else this.utilidadServicio.mostrarAlerta("No se pudo eliminar el usuario", "Error");    
          }, error: (e) => {console.log(e)}
        });
      }
    })
  }
}
