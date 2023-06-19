using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;
using System.Globalization;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IVentaRepository ventaRepositorio;
        private readonly IGenericRepository<Producto> productoRepositorio;
        private readonly IMapper mapper;

        public DashBoardService(IVentaRepository ventaRepositorio, IGenericRepository<Producto> productoRepositorio, IMapper mapper)
        {
            this.ventaRepositorio = ventaRepositorio;
            this.productoRepositorio = productoRepositorio;
            this.mapper = mapper;
        }

        private IQueryable<Venta> retornarVentas(IQueryable<Venta> tablaVenta, int restarCantDias)
        {
            DateTime? ultimaFecha = tablaVenta.OrderByDescending(v => v.FechaRegistro).Select(v => v.FechaRegistro).First();
            ultimaFecha = ultimaFecha.Value.AddDays(restarCantDias);
            return tablaVenta.Where(v => v.FechaRegistro.Value.Date >= ultimaFecha.Value.Date);
        }

        private async Task<int> totalVentasUltimaSemana()
        {
            int total = 0;
            IQueryable<Venta> ventaQuery = await ventaRepositorio.Consultar();
            if (ventaQuery.Count() > 0)
            {
                var tablaVenta = retornarVentas(ventaQuery, -7);
                total = tablaVenta.Count();
            }
            return total;
        }

        private async Task<string> totalIngresosUltimaSemana()
        {
            decimal resultado = 0;
            IQueryable<Venta> ventaQuery = await ventaRepositorio.Consultar();
            if (ventaQuery.Count() > 0)
            {
                var tablaVenta = retornarVentas(ventaQuery, -7);
                resultado = tablaVenta.Select(v => v.Total).Sum(v => v.Value);
            }
            return Convert.ToString(resultado, new CultureInfo("es-EC"));
        }

        private async Task<int> totalProductos()
        {
            IQueryable<Producto> productoQuery = await productoRepositorio.Consultar();
            int total = productoQuery.Count();
            return total;
        }

        private async Task<Dictionary<string, int>> ventasUltimaSemana()
        {
            Dictionary<string, int> resultado = new Dictionary<string, int>();
            IQueryable<Venta> ventaQuery = await ventaRepositorio.Consultar();
            if (ventaQuery.Count() > 0)
            {
                var tablaVenta = retornarVentas(ventaQuery, -7);
                resultado = tablaVenta.GroupBy(v => v.FechaRegistro.Value.Date)
                    .OrderBy(g => g.Key).Select(dv => new { fecha = dv.Key.ToString("dd/MM/yyyy"), total = dv.Count() })
                    .ToDictionary(keySelector: r => r.fecha, elementSelector: r => r.total);
            }
            return resultado;
        }

        public async Task<DashBoardDTO> Resumen()
        {
            DashBoardDTO vmDashBoard = new DashBoardDTO();

            try
            {
                vmDashBoard.TotalVentas = await totalVentasUltimaSemana();
                vmDashBoard.TotalIngresos = await totalIngresosUltimaSemana();
                vmDashBoard.TotalProductos = await totalProductos();

                List<VentasSemanaDTO> listaVentaSemana = new List<VentasSemanaDTO>();

                foreach (KeyValuePair<string, int> item in await ventasUltimaSemana())
                {
                    listaVentaSemana.Add(new VentasSemanaDTO()
                    {
                        Fecha = item.Key,
                        Total = item.Value
                    });
                }
                vmDashBoard.VentasUltimSemana = listaVentaSemana;
            }
            catch
            {
                throw;
            }
            return vmDashBoard;
        }
    }
}
