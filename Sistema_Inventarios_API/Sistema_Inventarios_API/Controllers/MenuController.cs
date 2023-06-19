using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sistema_Inventarios_BLL.Servicios;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DTO;

namespace Sistema_Inventarios_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService menuServicio;

        public MenuController(IMenuService menuServicio)
        {
            this.menuServicio = menuServicio;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista(int idUsuario)
        {
            var rsp = new Utilidad.Response<List<MenuDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await menuServicio.Lista(idUsuario);
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
