using System;
using System.Collections.Generic;

namespace Sistema_Inventarios_MOD;

public partial class Compra
{
    public int IdCompra { get; set; }

    public string? NumeroDocumento { get; set; }

    public string? NombreProveedor { get; set; }

    public decimal? Total { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public virtual ICollection<DetalleCompra> DetalleCompras { get; set; } = new List<DetalleCompra>();
}
