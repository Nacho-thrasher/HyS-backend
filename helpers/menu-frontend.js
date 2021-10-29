const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-view-dashboard',
          subMenu: [
            {
              titulo: 'Inicio',
              url: '/dashboard'
            },
            {
              titulo: 'Empresas',
              url: 'vista-empresas'
            },
            // {
            //   titulo: 'Extintores',
            //   url: 'progress'
            // }
            // {
            //   titulo: 'Others',
            //   url: 'progress'
            // },
            // {
            //   titulo: 'Promesas',
            //   url: 'promesas'
            // },
            // {
            //   titulo: 'Rxjs',
            //   url: 'rxjs'
            // }
          ]
        }

    ];

    if (role === 'ADMIN_ROLE') {
      menu.unshift(
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          subMenu: [
            {
              titulo: 'Usuarios',
              url: 'usuarios'
            },
            {
              titulo: 'Empresas',
              url: 'empresas'
            },
            {
              titulo: 'Extintores',
              url: 'extintores'
            },
            // {
            //   titulo: 'Actualizar Inspeccion',
            //   url: 'actualizar_inspeccion'
            // }
          ]
        }
      )


    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}