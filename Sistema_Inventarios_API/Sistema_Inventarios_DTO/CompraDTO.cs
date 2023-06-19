using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_DTO
{
    public class CompraDTO
    {
        public int IdCompra { get; set; }

        public string? NumeroDocumento { get; set; }

        public string? NombreProveedor { get; set; }

        public string? TotalTxt { get; set; }

        public string? FechaRegistro { get; set; }

        public virtual ICollection<DetalleCompraDTO> DetalleCompra { get; set; }
    }
}
