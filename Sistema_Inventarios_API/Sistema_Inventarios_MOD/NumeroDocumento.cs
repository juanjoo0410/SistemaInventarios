using System;
using System.Collections.Generic;

namespace Sistema_Inventarios_MOD;

public partial class NumeroDocumento
{
    public int IdNumeroDocumento { get; set; }

    public string? NombreDocumento { get; set; }

    public int UltimoNumero { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
