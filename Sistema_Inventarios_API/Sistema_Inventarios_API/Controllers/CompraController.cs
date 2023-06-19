using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly ICompraService compraServicio;

        public CompraController(ICompraService compraServicio)
        {
            this.compraServicio = compraServicio;
        }

        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> Registrar([FromBody] CompraDTO compra)
        {
            var rsp = new Utilidad.Response<CompraDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await compraServicio.Registrar(compra);
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
