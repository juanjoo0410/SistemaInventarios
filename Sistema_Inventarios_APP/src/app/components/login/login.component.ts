import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private formB: FormBuilder,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private utilidadServicio: UtilidadService
    ){
      this.formLogin = this.formB.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  
  }

  iniciarSesion(){
    this.mostrarLoading = true;
    const request: Login = {
      correo: this.formLogin.value.email,
      clave: this.formLogin.value.password
    };
    this.usuarioServicio.iniciarSesion(request).subscribe({
      next: (data) => {
        if (data.status){
          this.utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"]);
        } else {
          this.utilidadServicio.mostrarAlerta("No se encontraron coincidencias", "Opps!");
        }},
        complete:() => {
          this.mostrarLoading = false;
        },
        error: () => {
          this.utilidadServicio.mostrarAlerta("Hubo un error", "Opps!");
        }
    })
  }
}
