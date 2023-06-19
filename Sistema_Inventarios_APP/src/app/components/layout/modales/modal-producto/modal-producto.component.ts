import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/interfaces/categoria';
import { Producto } from 'src/app/interfaces/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {
  formProducto: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria [] = [];

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private formB: FormBuilder,
    private categoriaServicio: CategoriaService,
    private productoServicio: ProductoService,
    private utilidadServicio: UtilidadService
  ){
    this.formProducto = this.formB.group({
      nombre: ["", Validators.required],
      idCategoria: ["", Validators.required],
      marca: ["", Validators.required],
      stockMinimo: ["", Validators.required],
      peso: ["", Validators.required],
      precioCostoTxt: ["", Validators.required],
      precioVentaTxt: ["", Validators.required],
      esActivo: ['1', Validators.required]
    });

    if (this.datosProducto != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this.categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCategorias = data.value
      },
      error: (e) => {}
    })
  }

  ngOnInit(): void {
    if (this.datosProducto != null){
      this.formProducto.patchValue({
        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        marca: this.datosProducto.marca,
        stockMinimo: this.datosProducto.stockMinimo,
        peso: this.datosProducto.peso,
        precioCostoTxt: this.datosProducto.precioCostoTxt,
        precioVentaTxt: this.datosProducto.precioVentaTxt,
        esActivo: this.datosProducto.esActivo.toString()
      })
    }
  }

  guardarEditarProducto(){
    const producto: Producto = {
      idProducto: this.datosProducto == null ? 0 : this.datosProducto.idProducto,
      nombre: this.formProducto.value.nombre,
      idCategoria: this.formProducto.value.idCategoria,
      descripcionCategoria: "",
      marca: this.formProducto.value.marca,
      stock: 0,
      stockMinimo: this.formProducto.value.stockMinimo,
      peso: this.formProducto.value.peso,
      precioCostoTxt: this.formProducto.value.precioCostoTxt,
      precioVentaTxt: this.formProducto.value.precioVentaTxt,
      esActivo: parseInt(this.formProducto.value.esActivo)
    };

    console.log(producto);

    if (this.datosProducto == null){
      this.productoServicio.guardar(producto).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
            this.modalActual.close("true")
          } else this.utilidadServicio.mostrarAlerta("No se pudo registrar el producto", "Error")
        },
        error: (e) => {}
      });
    } else {
      this.productoServicio.editar(producto).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
            this.modalActual.close("true")
          } else {this.utilidadServicio.mostrarAlerta("No se pudo editar el producto", "Error")}
        },
        error: (e) => {}  
      });
    }
  }
}
