import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/services/dash-board.service';
import { ProductoService } from 'src/app/services/producto.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  totalIngresos: string = "0";
  totalVentas: string = "0";
  totalProductos: string = "0";
  totalProductosAgotados: string = "0";

  constructor(
    private dashboardServicio: DashBoardService,
    private productoServicio: ProductoService
  ){ }

  mostrarGraficos(labelGrafico: any[], dataGrafico: any[]){
    const charBarras = new Chart('chartBarras', {
      type: "bar",
      data: {
        labels: labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: [
            'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
            'rgb(255, 205, 86)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.obtenerProductosAgotados();
    this.dashboardServicio.resumen().subscribe({
      next: (data) =>{
        if (data.status){
          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProductos;
          const arrayData: any[] = data.value.ventasUltimSemana;
          console.log(arrayData);
          const labelTemp = arrayData.map((value) => value.fecha);
          const dataTemp = arrayData.map((value) => value.total);
          this.mostrarGraficos(labelTemp, dataTemp);
        }
      },
      error: (e)=>{}
    })
  }

  obtenerProductosAgotados(){
    this.productoServicio.listaAgotados().subscribe({
      next: (data) => {
        if (data.status) {
          this.totalProductosAgotados = data.value.length;
        } else {
          this.totalProductosAgotados = "0";
        }
      },
      error: (e) => {}
    })
  }
}
