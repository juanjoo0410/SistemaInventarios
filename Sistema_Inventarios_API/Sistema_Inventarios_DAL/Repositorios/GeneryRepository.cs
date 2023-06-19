using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DAL.DBContext;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Sistema_Inventarios_DAL.Repositorios
{
    public class GeneryRepository<TModelo> : IGenericRepository<TModelo> where TModelo : class
    {
        private readonly TiendaContext dbcontext;

        public GeneryRepository(TiendaContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<TModelo> Obtener(Expression<Func<TModelo, bool>> filtro)
        {
            try
            {
                TModelo modelo = await dbcontext.Set<TModelo>().FirstOrDefaultAsync(filtro);
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TModelo> Crear(TModelo modelo)
        {
            try
            {
                dbcontext.Set<TModelo>().Add(modelo);
                await dbcontext.SaveChangesAsync();
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TModelo modelo)
        {
            try
            {
                dbcontext.Set<TModelo>().Update(modelo);
                await dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(TModelo modelo)
        {
            try
            {
                dbcontext.Set<TModelo>().Remove(modelo);
                await dbcontext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IQueryable<TModelo>> Consultar(Expression<Func<TModelo, bool>> filtro = null)
        {
            try
            {
                IQueryable<TModelo> queryModelo = filtro == null ? dbcontext.Set<TModelo>() : dbcontext.Set<TModelo>().Where(filtro);
                return queryModelo;
            }
            catch
            {
                throw;
            }
        }
    }
}
