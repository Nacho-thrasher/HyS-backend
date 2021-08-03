const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          subMenu: [
            {
              titulo: 'Empresas',
              url: '/'
            },
            {
              titulo: 'Extintores',
              url: 'progress'
            },
            {
              titulo: 'Usuarios',
              url: 'grafica1'
            },
            {
              titulo: 'Promesas',
              url: 'promesas'
            },
            {
              titulo: 'Rxjs',
              url: 'rxjs'
            }
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          subMenu: [
            {
              titulo: 'Planillas',
              url: '/'
            },
            {
              titulo: 'Imprtaciones',
              url: 'progress'
            },
            // {
            //   titulo: 'Usuarios',
            //   url: 'usuarios'
            // },
            {
              titulo: 'Empresas',
              url: 'empresas'
            },
            {
              titulo: 'Extintores',
              url: 'extintores'
            }
          ]
        }
      ];

      if (role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({
            titulo: 'Usuarios',
            url: 'usuarios'
        })
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}