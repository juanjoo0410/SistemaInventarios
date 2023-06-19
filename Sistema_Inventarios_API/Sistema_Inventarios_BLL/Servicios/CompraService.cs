using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class CompraService : ICompraService
    {
        private readonly ICompraRepository compraRepositorio;
        private readonly IMapper mapper;

        public CompraService(ICompraRepository compraRepositorio, IMapper mapper)
        {
            this.compraRepositorio = compraRepositorio;
            this.mapper = mapper;
        }

        public async Task<CompraDTO> Registrar(CompraDTO modelo)
        {
            try
            {
                var compraGenerada = await compraRepositorio.Registrar(mapper.Map<Compra>(modelo));
                if (compraGenerada.IdCompra == 0)
                    throw new TaskCanceledException("No se pudo crear la compra");
                return mapper.Map<CompraDTO>(compraGenerada);
            }
            catch
            {
                throw;
            }
        }
    }
}
