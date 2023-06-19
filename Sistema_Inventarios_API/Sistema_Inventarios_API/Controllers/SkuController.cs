using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_API.Utilidad;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkuController : ControllerBase
    {
        private readonly ISkuService skuServicio;

        public SkuController(ISkuService skuServicio)
        {
            this.skuServicio = skuServicio;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var rsp = new Response<List<SkuDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await skuServicio.Lista();
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
