using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {
        private readonly IVentaService ventaServicio;

        public VentaController(IVentaService ventaServicio)
        {
            this.ventaServicio = ventaServicio;
        }

        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> Registrar([FromBody] VentaDTO venta)
        {
            var rsp = new Utilidad.Response<VentaDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await ventaServicio.Registrar(venta);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Historial")]
        public async Task<IActionResult> Historial(string buscarPor, string? numeroVenta, 
            string? fechaInicio, string?  fechaFin)
        {
            var rsp = new Utilidad.Response<List<VentaDTO>>();
            numeroVenta = numeroVenta is null ? "" : numeroVenta;
            fechaInicio = fechaInicio is null ? "" : fechaInicio;
            fechaFin = fechaFin is null ? "" : fechaFin;
            try
            {
                rsp.status = true;
                rsp.value = await ventaServicio.Historial(buscarPor, numeroVenta, fechaInicio, fechaFin);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Reporte")]
        public async Task<IActionResult> Reporte(string? fechaInicio, string? fechaFin)
        {
            var rsp = new Utilidad.Response<List<ReporteDTO>>();
            fechaInicio = fechaInicio is null ? "" : fechaInicio;
            fechaFin = fechaFin is null ? "" : fechaFin;
            try
            {
                rsp.status = true;
                rsp.value = await ventaServicio.Reporte(fechaInicio, fechaFin);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }
    }
}
