﻿using Sistema_Inventarios_DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_BLL.Servicios.Contrato
{
    public interface ICategoriaService
    {
        Task<List<CategoriaDTO>> Lista();
        Task<CategoriaDTO> Crear(CategoriaDTO modelo);
        Task<bool> Editar(CategoriaDTO modelo);
        Task<bool> Eliminar(int id);
    }
}
