using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_DTO
{
    public class DashBoardDTO
    {
        public int TotalVentas { get; set; }
        public int TotalCompras { get; set; }
        public string? TotalIngresos { get; set; }
        public int TotalProductos { get; set; }
        public List<VentasSemanaDTO> VentasUltimSemana { get; set; }
    }
}
