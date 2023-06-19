
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sistema_Inventarios_BLL.Servicios;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.DBContext;
using Sistema_Inventarios_DAL.Repositorios;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_UTL;

namespace Sistema_Inventarios_IOC
{
    public static class Dependencia
    {
        public static void InyectarDependencias(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TiendaContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("Conexion"));
            });

            services.AddTransient(typeof(IGenericRepository<>), typeof(GeneryRepository<>));
            services.AddScoped<IVentaRepository, VentaRepository>();
            services.AddScoped<ICompraRepository, CompraRepository>();

            services.AddAutoMapper(typeof(AutoMapperProfile));

            services.AddScoped<IRolService, RolService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<ISkuService, SkuService>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<IProductoService, ProductoService>();
            services.AddScoped<IVentaService, VentaService>();
            services.AddScoped<IDashBoardService, DashBoardService>();
            services.AddScoped<IMenuService, MenuService>();
        }
    }
}
