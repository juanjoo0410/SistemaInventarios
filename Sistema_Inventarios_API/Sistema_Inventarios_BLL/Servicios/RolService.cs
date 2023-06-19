using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class RolService : IRolService
    {
        private readonly IGenericRepository<Rol> rolRepositorio;
        private readonly IMapper mapper;

        public RolService(IGenericRepository<Rol> rolRepositorio, IMapper mapper)
        {
            this.rolRepositorio = rolRepositorio;
            this.mapper = mapper;
        }

        public async Task<List<RolDTO>> Lista()
        {
            try
            {
                var listaRoles = await rolRepositorio.Consultar();
                return mapper.Map<List<RolDTO>>(listaRoles.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
