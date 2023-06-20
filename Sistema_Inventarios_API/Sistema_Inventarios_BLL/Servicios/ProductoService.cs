using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class ProductoService : IProductoService
    {
        private readonly IGenericRepository<Producto> productoRepositorio;
        private readonly IMapper mapper;

        public ProductoService(IGenericRepository<Producto> productoRepositorio, IMapper mapper)
        {
            this.productoRepositorio = productoRepositorio;
            this.mapper = mapper;
        }

        public async Task<List<ProductoDTO>> Lista()
        {
            try
            {
                var queryProducto = await productoRepositorio.Consultar();
                var listaProductos = queryProducto.Include(categoria => categoria.IdCategoriaNavigation).ToList();
                return mapper.Map<List<ProductoDTO>>(listaProductos.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductoDTO> Crear(ProductoDTO modelo)
        {
            try
            {
                var productoCreado = await productoRepositorio.Crear(mapper.Map<Producto>(modelo));
                if (productoCreado.IdProducto == 0)
                    throw new TaskCanceledException("No se pudo crear el producto");
                return mapper.Map<ProductoDTO>(productoCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ProductoDTO modelo)
        {
            try
            {
                var productoModelo = mapper.Map<Producto>(modelo);
                var productoEncontrado = await productoRepositorio.Obtener(p => p.IdProducto == productoModelo.IdProducto);
                if (productoEncontrado == null)
                    throw new TaskCanceledException("El producto no existe");
                productoEncontrado.Nombre = productoModelo.Nombre;
                productoEncontrado.IdCategoria = productoModelo.IdCategoria;
                productoEncontrado.Marca = productoModelo.Marca;
                productoEncontrado.Stock = productoModelo.Stock;
                productoEncontrado.StockMinimo = productoModelo.StockMinimo;
                productoEncontrado.Peso = productoModelo.Peso;
                productoEncontrado.PrecioCosto = productoModelo.PrecioCosto;
                productoEncontrado.PrecioVenta = productoModelo.PrecioVenta;
                productoEncontrado.EsActivo = productoModelo.EsActivo;

                bool respuesta = await productoRepositorio.Editar(productoEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar la informacion");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var productoEncontrado = await productoRepositorio.Obtener(p => p.IdProducto == id);
                if (productoEncontrado == null)
                    throw new TaskCanceledException("El producto no existe");
                bool respuesta = await productoRepositorio.Eliminar(productoEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar el producto");
                return respuesta;
            }
            catch
            {

                throw;
            }
        }

        public async Task<List<ProductoDTO>> ListaAgotados()
        {
            try
            {
                var queryProducto = await productoRepositorio.Consultar();
                var listaProductos = queryProducto
                    .Include(categoria => categoria.IdCategoriaNavigation)
                    .Where(p => p.Stock <= p.StockMinimo)
                    .ToList();
                return mapper.Map<List<ProductoDTO>>(listaProductos.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
