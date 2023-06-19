using Sistema_Inventarios_DAL.DBContext;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_DAL.Repositorios
{
    public class VentaRepository : GeneryRepository<Venta>, IVentaRepository
    {
        private readonly TiendaContext dbcontext;

        public VentaRepository(TiendaContext dbcontext) : base(dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Venta> Registrar(Venta modelo)
        {
            Venta ventaGenerada = new Venta();

            using(var trasaction = dbcontext.Database.BeginTransaction())
            {
                try
                {
                    //Actualizar stock de producto
                    foreach (DetalleVenta dv in modelo.DetalleVenta)
                    {
                        Producto productoEncontrado = dbcontext.Productos.Where(p => p.IdProducto == dv.IdProducto).First();
                        productoEncontrado.Stock = productoEncontrado.Stock - dv.Cantidad;
                        dbcontext.Productos.Update(productoEncontrado);
                    }
                    await dbcontext.SaveChangesAsync();

                    //Obtener numero de venta
                    NumeroDocumento correlativo = dbcontext.NumeroDocumentos.Where(nd => nd.NombreDocumento == "Venta").First();
                    correlativo.UltimoNumero = correlativo.UltimoNumero + 1;
                    correlativo.FechaRegistro = DateTime.Now;
                    dbcontext.NumeroDocumentos.Update(correlativo);
                    await dbcontext.SaveChangesAsync();

                    //Formato numero de venta
                    int cantDigitos = 4;
                    string ceros = string.Concat(Enumerable.Repeat("0", cantDigitos));
                    string numeroVenta = ceros + correlativo.UltimoNumero.ToString();
                    numeroVenta = numeroVenta.Substring(numeroVenta.Length - cantDigitos, cantDigitos);
                    modelo.NumeroDocumento = numeroVenta;
                    await dbcontext.Venta.AddAsync(modelo);
                    await dbcontext.SaveChangesAsync();

                    ventaGenerada = modelo;

                    trasaction.Commit();
                }
                catch
                {
                    trasaction.Rollback();
                    throw;
                }
                return ventaGenerada;
            }
        }
    }
}
