using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_DTO
{
    public class VentaDTO
    {
        public int IdVenta { get; set; }

        public string? NumeroDocumento { get; set; }

        public string? NombreCliente { get; set; }

        public string? TipoPago { get; set; }

        public string? TotalTxt { get; set; }

        public string? FechaRegistro { get; set; }

        public virtual ICollection<DetalleVentaDTO> DetalleVenta { get; set; }
    }
}
