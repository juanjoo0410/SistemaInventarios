using AutoMapper;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;
using System.Globalization;

namespace Sistema_Inventarios_UTL
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Rol, RolDTO>().ReverseMap();

            CreateMap<Menu, MenuDTO>().ReverseMap();

            #region Usuario
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(destino => destino.RolDescripcion,
                opt => opt.MapFrom(origen => origen.IdRolNavigation.Nombre))
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == true ? 1 : 0));
            CreateMap<Usuario, SesionDTO>()
                .ForMember(destino => destino.RolDescripcion,
                opt => opt.MapFrom(origen => origen.IdRolNavigation.Nombre));
            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino => destino.IdRolNavigation,
                opt => opt.Ignore())
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == 1 ? true : false));
            #endregion

            CreateMap<Sku, SkuDTO>().ReverseMap();

            #region Categoria
            CreateMap<Categoria, CategoriaDTO>()
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == true ? 1 : 0));
            CreateMap<CategoriaDTO, Categoria>()
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == 1 ? true : false));
            #endregion

            #region Producto
            CreateMap<Producto, ProductoDTO>()
                .ForMember(destino => destino.DescripcionCategoria,
                opt => opt.MapFrom(origen => origen.IdCategoriaNavigation.Nombre))
                .ForMember(destino => destino.PrecioCostoTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioCosto.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.PrecioVentaTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioVenta.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == true ? 1 : 0));
            CreateMap<ProductoDTO, Producto>()
                .ForMember(destino => destino.IdCategoriaNavigation,
                opt => opt.Ignore())
                .ForMember(destino => destino.PrecioCosto,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioCostoTxt, new CultureInfo("es-US"))))
                .ForMember(destino => destino.PrecioVenta,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioVentaTxt, new CultureInfo("es-US"))))
                .ForMember(destino => destino.EsActivo,
                opt => opt.MapFrom(origen => origen.EsActivo == 1 ? true : false));
            #endregion

            #region Venta
            CreateMap<Venta, VentaDTO>()
                .ForMember(destino => destino.TotalTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.FechaRegistro,
                opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy")));
            CreateMap<VentaDTO, Venta>()
                .ForMember(destino => destino.Total,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalTxt, new CultureInfo("es-US"))));
            #endregion

            #region Compra
            CreateMap<Compra, CompraDTO>()
                .ForMember(destino => destino.TotalTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.FechaRegistro,
                opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy")));
            CreateMap<CompraDTO, Compra>()
                .ForMember(destino => destino.Total,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalTxt, new CultureInfo("es-US"))));
            #endregion

            #region DetalleVenta
            CreateMap<DetalleVenta, DetalleVentaDTO>()
                .ForMember(destino => destino.DescripcionProducto,
                opt => opt.MapFrom(origen => origen.IdProductoNavigation.Nombre))
                .ForMember(destino => destino.PrecioTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.TotalTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-US"))));
            CreateMap<DetalleVentaDTO, DetalleVenta>()
                .ForMember(destino => destino.Precio,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioTxt, new CultureInfo("es-US"))))
                .ForMember(destino => destino.Total,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalTxt, new CultureInfo("es-US"))));
            #endregion

            #region DetalleCompra
            CreateMap<DetalleCompra, DetalleCompraDTO>()
                .ForMember(destino => destino.DescripcionProducto,
                opt => opt.MapFrom(origen => origen.IdProductoNavigation.Nombre))
                .ForMember(destino => destino.PrecioTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.TotalTxt,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-US"))));
            CreateMap<DetalleCompraDTO, DetalleCompra>()
                .ForMember(destino => destino.Precio,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioTxt, new CultureInfo("es-US"))))
                .ForMember(destino => destino.Total,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalTxt, new CultureInfo("es-US"))));
            #endregion

            #region Reporte
            CreateMap<DetalleVenta, ReporteDTO>()
                .ForMember(destino => destino.FechaRegistro,
                opt => opt.MapFrom(origen => origen.IdVentaNavigation.FechaRegistro.Value.ToString("dd/MM/yyyy")))
                .ForMember(destino => destino.NumeroDoc,
                opt => opt.MapFrom(origen => origen.IdVentaNavigation.NumeroDocumento))
                .ForMember(destino => destino.TipoPago,
                opt => opt.MapFrom(origen => origen.IdVentaNavigation.TipoPago))
                .ForMember(destino => destino.TotalVenta,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.IdVentaNavigation.Total.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.Producto,
                opt => opt.MapFrom(origen => origen.IdProductoNavigation.Nombre))
                .ForMember(destino => destino.Precio,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.Precio.Value, new CultureInfo("es-US"))))
                .ForMember(destino => destino.Total,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.Total.Value, new CultureInfo("es-US"))));
            #endregion
        }
    }
}
