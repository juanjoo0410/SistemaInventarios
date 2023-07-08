import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VentaComponent } from './pages/venta/venta.component';
import { HistorialVentaComponent } from './pages/historial-venta/historial-venta.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ProductosAgotadosComponent } from './pages/productos-agotados/productos-agotados.component';
import { CalidadComponent } from './pages/calidad/calidad.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children:[
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashBoardComponent},
      {path: 'usuarios', component: UsuarioComponent},
      {path: 'categorias', component: CategoriaComponent},
      {path: 'productos', component: ProductoComponent},
      {path: 'venta', component: VentaComponent},
      {path: 'compra', component: CompraComponent},
      {path: 'productos_agotados', component: ProductosAgotadosComponent},
      {path: 'historial_venta', component: HistorialVentaComponent},
      {path: 'reportes', component: ReporteComponent},
      {path: 'calidad', component: CalidadComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
