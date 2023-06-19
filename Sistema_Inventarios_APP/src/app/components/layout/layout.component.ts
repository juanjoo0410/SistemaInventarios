import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  listaMenus: Menu[] = [];
  correoUsuario: string = "";
  rolUsuario: string = "";
  nombreUsuario: string = "";

  constructor(
    private router: Router,
    private menuServicio: MenuService,
    private utilidadServicio: UtilidadService
  ){}

  ngOnInit(): void {
    const usuario = this.utilidadServicio.obtenerSesionUsuario();
    if(usuario != null){
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;
      this.nombreUsuario = usuario.nombreCompleto;
      this.menuServicio.lista(usuario.idUsuario).subscribe({
        next: (data) =>{
          if(data.value) this. listaMenus = data.value;
        },
        error: (e) =>{}
      })
    }
  }

  cerrarSesion(){
    this.utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

}
