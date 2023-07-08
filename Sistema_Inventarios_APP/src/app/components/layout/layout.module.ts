import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { HistorialVentaComponent } from './pages/historial-venta/historial-venta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { SharedModule } from 'src/app/reutilizable/shared/shared.module';
import { ModalUsuarioComponent } from './modales/modal-usuario/modal-usuario.component';
import { ModalProductoComponent } from './modales/modal-producto/modal-producto.component';
import { ModalDetalleVentaComponent } from './modales/modal-detalle-venta/modal-detalle-venta.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ModalCategoriaComponent } from './modales/modal-categoria/modal-categoria.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ProductosAgotadosComponent } from './pages/productos-agotados/productos-agotados.component';
import { CalidadComponent } from './pages/calidad/calidad.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    UsuarioComponent,
    ProductoComponent,
    VentaComponent,
    HistorialVentaComponent,
    ReporteComponent,
    ModalUsuarioComponent,
    ModalProductoComponent,
    ModalDetalleVentaComponent,
    CategoriaComponent,
    ModalCategoriaComponent,
    CompraComponent,
    ProductosAgotadosComponent,
    CalidadComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
