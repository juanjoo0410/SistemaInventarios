using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_API.Utilidad;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly IRolService rolServicio;

        public RolController(IRolService rolServicio)
        {
            this.rolServicio = rolServicio;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var rsp = new Utilidad.Response<List<RolDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await rolServicio.Lista();
            }
            catch (Exception ex)
            {
                rsp.status=false;
                rsp.msg = ex.Message;
            }
            return Ok(rsp);
        }
    }
}
