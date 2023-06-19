using System;
using System.Collections.Generic;

namespace Sistema_Inventarios_MOD;

public partial class Sku
{
    public int IdSku { get; set; }

    public string? Nombre { get; set; }

    public bool? EsActivo { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
