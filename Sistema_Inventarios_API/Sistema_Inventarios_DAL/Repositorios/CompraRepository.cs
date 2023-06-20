using Sistema_Inventarios_DAL.DBContext;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_DAL.Repositorios
{
    public class CompraRepository : GeneryRepository<Compra>, ICompraRepository
    {
        private readonly TiendaContext dbcontext;

        public CompraRepository(TiendaContext dbcontext) : base(dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Compra> Registrar(Compra modelo)
        {
            Compra compraGenerada = new Compra();

            using(var trasaction = dbcontext.Database.BeginTransaction())
            {
                try
                {
                    //Actualizar stock de producto
                    foreach (DetalleCompra dc in modelo.DetalleCompra)
                    {
                        Producto productoEncontrado = dbcontext.Productos.Where(p => p.IdProducto == dc.IdProducto).First();
                        productoEncontrado.Stock = productoEncontrado.Stock + dc.Cantidad;
                        dbcontext.Productos.Update(productoEncontrado);
                    }
                    await dbcontext.SaveChangesAsync();

                    //Obtener numero de compra
                    NumeroDocumento correlativo = dbcontext.NumeroDocumentos.Where(nd => nd.NombreDocumento == "Compra").First();
                    correlativo.UltimoNumero = correlativo.UltimoNumero + 1;
                    correlativo.FechaRegistro = DateTime.Now;
                    dbcontext.NumeroDocumentos.Update(correlativo);
                    await dbcontext.SaveChangesAsync();

                    //Formato numero de compra
                    int cantDigitos = 4;
                    string ceros = string.Concat(Enumerable.Repeat("0", cantDigitos));
                    string numeroCompra = ceros + correlativo.UltimoNumero.ToString();
                    numeroCompra = numeroCompra.Substring(numeroCompra.Length - cantDigitos, cantDigitos);
                    modelo.NumeroDocumento = numeroCompra;
                    await dbcontext.Compra.AddAsync(modelo);
                    await dbcontext.SaveChangesAsync();

                    compraGenerada = modelo;

                    trasaction.Commit();
                }
                catch
                {
                    trasaction.Rollback();
                    throw;
                }
                return compraGenerada;
            }
        }
    }
}
