using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_DTO
{
    public class DetalleCompraDTO
    {
        public int? IdProducto { get; set; }

        public string? DescripcionProducto { get; set; }

        public int? Cantidad { get; set; }

        public string? PrecioTxt { get; set; }

        public string? TotalTxt { get; set; }
    }
}
