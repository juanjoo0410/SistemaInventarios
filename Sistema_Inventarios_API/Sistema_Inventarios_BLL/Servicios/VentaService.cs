using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;
using System.Globalization;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class VentaService : IVentaService
    {
        private readonly IVentaRepository ventaRepositorio;
        private readonly IGenericRepository<DetalleVenta> detalleVentaRepositorio;
        private readonly IMapper mapper;

        public VentaService(IVentaRepository ventaRepositorio, IGenericRepository<DetalleVenta> detalleVentaRepositorio, IMapper mapper)
        {
            this.ventaRepositorio = ventaRepositorio;
            this.detalleVentaRepositorio = detalleVentaRepositorio;
            this.mapper = mapper;
        }

        public async Task<VentaDTO> Registrar(VentaDTO modelo)
        {
            try
            {
                var ventaGenerada = await ventaRepositorio.Registrar(mapper.Map<Venta>(modelo));
                if (ventaGenerada.IdVenta == 0)
                    throw new TaskCanceledException("No se pudo crear la venta");
                return mapper.Map<VentaDTO>(ventaGenerada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<VentaDTO>> Historial(string buscarPor, string numeroVenta, string fechaInicio, string fechaFin)
        {
            IQueryable<Venta> query = await ventaRepositorio.Consultar();
            var listaResultado = new List<Venta>();
            try
            {
                if (buscarPor == "fecha")
                {
                    DateTime fech_ini = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                    DateTime fech_fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));
                    listaResultado = await query.Where(v =>
                    v.FechaRegistro.Value.Date >= fech_ini.Date &&
                    v.FechaRegistro.Value.Date <= fech_fin.Date)
                        .Include(dv => dv.DetalleVenta)
                        .ThenInclude(p => p.IdProductoNavigation).ToListAsync();
                }
                else
                {
                    listaResultado = await query.Where(v =>
                    v.NumeroDocumento == numeroVenta)
                        .Include(dv => dv.DetalleVenta)
                        .ThenInclude(p => p.IdProductoNavigation).ToListAsync();
                }
            }
            catch
            {
                throw;
            }
            return mapper.Map<List<VentaDTO>>(listaResultado);
        }

        public async Task<List<ReporteDTO>> Reporte(string fechaInicio, string fechaFin)
        {
            IQueryable<DetalleVenta> query = await detalleVentaRepositorio.Consultar();
            var listaResultado = new List<DetalleVenta>();
            try
            {
                DateTime fech_ini = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-EC"));
                DateTime fech_fin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-EC"));
                listaResultado = await query
                    .Include(p => p.IdProductoNavigation)
                    .Include(v => v.IdVentaNavigation)
                    .Where(dv => dv.IdVentaNavigation.FechaRegistro.Value.Date >= fech_ini.Date &&
                    dv.IdVentaNavigation.FechaRegistro.Value.Date <= fech_fin.Date).ToListAsync();
            }
            catch
            {
                throw;
            }
            return mapper.Map<List<ReporteDTO>>(listaResultado);
        }
    }
}
