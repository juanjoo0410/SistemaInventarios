using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_DAL.Repositorios.Contrato
{
    public interface ICompraRepository : IGenericRepository<Compra>
    {
        Task<Compra> Registrar(Compra modelo);
    }
}