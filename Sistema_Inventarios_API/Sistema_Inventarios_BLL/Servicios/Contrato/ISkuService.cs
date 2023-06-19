using Sistema_Inventarios_DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_BLL.Servicios.Contrato
{
    public interface ISkuService
    {
        Task<List<SkuDTO>> Lista();
    }
}
