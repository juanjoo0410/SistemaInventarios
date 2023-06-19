using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class SkuService : ISkuService
    {
        private readonly IGenericRepository<Sku> skuRepositorio;
        private readonly IMapper mapper;

        public SkuService(IGenericRepository<Sku> skuRepositorio, IMapper mapper)
        {
            this.skuRepositorio = skuRepositorio;
            this.mapper = mapper;
        }
        public async Task<List<SkuDTO>> Lista()
        {
            try
            {
                var listaSku = await skuRepositorio.Consultar();
                return mapper.Map<List<SkuDTO>>(listaSku.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
