using System;
using System.Collections.Generic;

namespace Sistema_Inventarios_MOD;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string? Nombre { get; set; }

    public int? IdCategoria { get; set; }

    public string? Marca { get; set; }

    public int? Stock { get; set; }

    public int? StockMinimo { get; set; }

    public string? Peso { get; set; }

    public decimal? PrecioCosto { get; set; }

    public decimal? PrecioVenta { get; set; }

    public bool? EsActivo { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<DetalleCompra> DetalleCompra { get; set; } = new List<DetalleCompra>();

    public virtual ICollection<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();

    public virtual Categoria? IdCategoriaNavigation { get; set; }
}
