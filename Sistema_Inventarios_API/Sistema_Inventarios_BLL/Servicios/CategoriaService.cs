using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IGenericRepository<Categoria> categoriaRepositorio;
        private readonly IMapper mapper;

        public CategoriaService(IGenericRepository<Categoria> categoriaRepositorio, IMapper mapper)
        {
            this.categoriaRepositorio = categoriaRepositorio;
            this.mapper = mapper;
        }

        public async Task<List<CategoriaDTO>> Lista()
        {
            try
            {
                var listaCategoria = await categoriaRepositorio.Consultar();
                return mapper.Map<List<CategoriaDTO>>(listaCategoria.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<CategoriaDTO> Crear(CategoriaDTO modelo)
        {
            try
            {
                var categoriaCreada = await categoriaRepositorio.Crear(mapper.Map<Categoria>(modelo));
                if (categoriaCreada.IdCategoria == 0)
                    throw new TaskCanceledException("No se pudo crear la categoria");
                return mapper.Map<CategoriaDTO>(categoriaCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(CategoriaDTO modelo)
        {
            try
            {
                var categoriaModelo = mapper.Map<Categoria>(modelo);
                var categoriaEncontrada = await categoriaRepositorio.Obtener(c => c.IdCategoria == categoriaModelo.IdCategoria);
                if (categoriaEncontrada == null)
                    throw new TaskCanceledException("La categoria no existe");
                categoriaEncontrada.Nombre = categoriaModelo.Nombre;
                categoriaEncontrada.Sku = categoriaModelo.Sku;
                categoriaEncontrada.EsActivo = categoriaModelo.EsActivo;

                bool respuesta = await categoriaRepositorio.Editar(categoriaEncontrada);
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
                var categoriaEncontrada = await categoriaRepositorio.Obtener(c => c.IdCategoria == id);
                if (categoriaEncontrada == null)
                    throw new TaskCanceledException("La categoria no existe");
                bool respuesta = await categoriaRepositorio.Eliminar(categoriaEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar la categoria");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }
    }
}
