import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {
  formUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaRoles: Rol [] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private formB: FormBuilder,
    private rolServicio: RolService,
    private usuarioServicio: UsuarioService,
    private utilidadServicio: UtilidadService
  ){
    this.formUsuario = this.formB.group({
      nombreCompleto: ["", Validators.required],
      correo: ["", Validators.required],
      idRol: ["", Validators.required],
      clave: ["", Validators.required],
      esActivo: ['1', Validators.required]
    });

    if (this.datosUsuario != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this.rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaRoles = data.value
      },
      error: (e) => {}
    })
  }

  ngOnInit(): void {
    if (this.datosUsuario != null){
      this.formUsuario.patchValue({
        nombreCompleto: this.datosUsuario.nombreCompleto,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        clave: this.datosUsuario.clave,
        esActivo: this.datosUsuario.esActivo.toString()
      })
    }
  }

  guardarEditarUsuario(){
    const usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombreCompleto: this.formUsuario.value.nombreCompleto,
      correo: this.formUsuario.value.correo,
      idRol: this.formUsuario.value.idRol,
      rolDescripcion: "",
      clave: this.formUsuario.value.clave,
      esActivo: parseInt(this.formUsuario.value.esActivo)
    };

    if (this.datosUsuario == null){
      this.usuarioServicio.guardar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("El usuario fue registrado", "Exito");
            this.modalActual.close("true")
          } else this.utilidadServicio.mostrarAlerta("No se pudo registrar el usuario", "Error")
        },
        error: (e) => {}
      });
    } else {
      this.usuarioServicio.editar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("El usuario fue editado", "Exito");
            this.modalActual.close("true")
          } else {this.utilidadServicio.mostrarAlerta("No se pudo editar el usuario", "Error")}
        },
        error: (e) => {}  
      });
    }
  }
}
