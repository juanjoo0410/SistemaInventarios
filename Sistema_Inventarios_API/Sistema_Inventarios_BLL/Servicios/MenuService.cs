﻿using AutoMapper;
using Sistema_Inventarios_BLL.Servicios.Contrato;
using Sistema_Inventarios_DAL.Repositorios.Contrato;
using Sistema_Inventarios_DTO;
using Sistema_Inventarios_MOD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Inventarios_BLL.Servicios
{
    public class MenuService : IMenuService
    {
        private readonly IGenericRepository<Usuario> usuarioRepositorio;
        private readonly IGenericRepository<MenuRol> menuRolRepositorio;
        private readonly IGenericRepository<Menu> menuRepositorio;
        private readonly IMapper mapper;

        public MenuService(IGenericRepository<Usuario> usuarioRepositorio, 
            IGenericRepository<MenuRol> menuRolRepositorio, 
            IGenericRepository<Menu> menuRepositorio, IMapper mapper)
        {
            this.usuarioRepositorio = usuarioRepositorio;
            this.menuRolRepositorio = menuRolRepositorio;
            this.menuRepositorio = menuRepositorio;
            this.mapper = mapper;
        }

        public async Task<List<MenuDTO>> Lista(int idUsuario)
        {
            IQueryable<Usuario> tbUsuario = await usuarioRepositorio.Consultar(u => u.IdUsuario == idUsuario);
            IQueryable<MenuRol> tbMenuRol = await menuRolRepositorio.Consultar();
            IQueryable<Menu> tbMenu = await menuRepositorio.Consultar();

            try
            {
                IQueryable<Menu> tbResultado = (
                    from u in tbUsuario
                    join mr in tbMenuRol on u.IdRol equals mr.IdRol
                    join m in tbMenu on mr.IdMenu equals m.IdMenu
                    select m).AsQueryable();
                var listaMenus = tbResultado.ToList();
                return mapper.Map<List<MenuDTO>>(listaMenus);
            }
            catch
            {
                throw;
            }
        }
    }
}
