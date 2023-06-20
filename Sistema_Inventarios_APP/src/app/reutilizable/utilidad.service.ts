import { Injectable, Sanitizer } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string){
    this.snackBar.open(mensaje, tipo, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000
    });
  }

  guardarSesionUsuario(usuarioSession: Sesion){
    localStorage.setItem("usuario", JSON.stringify(usuarioSession));
  }

  obtenerSesionUsuario(){
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }

  eliminarSesionUsuario(){
    localStorage.removeItem("usuario");
  }
}
