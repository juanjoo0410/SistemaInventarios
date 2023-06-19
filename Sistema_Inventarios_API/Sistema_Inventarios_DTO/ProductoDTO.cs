using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_DTO
{
    public class ProductoDTO
    {
        public int IdProducto { get; set; }
        public string? Nombre { get; set; }
        public int? IdCategoria { get; set; }
        public string? DescripcionCategoria { get; set; }
        public string? Marca { get; set; }
        public int? Stock { get; set; }
        public int? StockMinimo { get; set; }
        public string? Peso { get; set; }
        public string? PrecioCostoTxt { get; set; }
        public string? PrecioVentaTxt { get; set; }
        public int? EsActivo { get; set; }
    }
}
