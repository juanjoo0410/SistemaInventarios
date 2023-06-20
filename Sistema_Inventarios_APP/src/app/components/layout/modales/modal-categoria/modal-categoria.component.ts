import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sku } from 'src/app/interfaces/sku';
import { Categoria } from 'src/app/interfaces/categoria';
import { SkuService } from 'src/app/services/sku.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {
  formCategoria: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaSku: Sku [] = [];

  constructor(
    private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCategoria: Categoria,
    private formB: FormBuilder,
    private skuServicio: SkuService,
    private categoriaServicio: CategoriaService,
    private utilidadServicio: UtilidadService
  ){
    this.formCategoria = this.formB.group({
      nombre: ["", Validators.required],
      sku: ["", Validators.required],
      esActivo: ['1', Validators.required]
    });

    if (this.datosCategoria != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this.skuServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaSku = data.value
      },
      error: (e) => {}
    })
  }

  ngOnInit(): void {
    if (this.datosCategoria != null){
      this.formCategoria.patchValue({
        nombre: this.datosCategoria.nombre,
        sku: this.datosCategoria.sku,
        esActivo: this.datosCategoria.esActivo.toString()
      })
    }
  }

  guardarEditarCategoria(){
    const categoria: Categoria = {
      idCategoria: this.datosCategoria == null ? 0 : this.datosCategoria.idCategoria,
      nombre: this.formCategoria.value.nombre,
      sku: this.formCategoria.value.sku,
      esActivo: parseInt(this.formCategoria.value.esActivo)
    };

    if (this.datosCategoria == null){
      this.categoriaServicio.guardar(categoria).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("La categoria fue registrada", "Exito");
            this.modalActual.close("true")
          } else this.utilidadServicio.mostrarAlerta("No se pudo registrar la categoria", "Error")
        },
        error: (e) => {}
      });
    } else {
      this.categoriaServicio.editar(categoria).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("La categoria fue editada", "Exito");
            this.modalActual.close("true")
          } else {this.utilidadServicio.mostrarAlerta("No se pudo editar la categoria", "Error")}
        },
        error: (e) => {}  
      });
    }
  }
}
