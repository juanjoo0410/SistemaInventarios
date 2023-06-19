using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService dashboardServicio;

        public DashBoardController(IDashBoardService dashboardServicio)
        {
            this.dashboardServicio = dashboardServicio;
        }

        [HttpGet]
        [Route("Resumen")]
        public async Task<IActionResult> Resumen()
        {
            var rsp = new Utilidad.Response<DashBoardDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await dashboardServicio.Resumen();
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
