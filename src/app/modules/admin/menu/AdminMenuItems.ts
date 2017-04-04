import {Menu} from "../../menu/types/Menu";
export const ADMINMENUITEMS: Menu[] = [
  {
    dropdown: false,
    link: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'fa-home',
    permission: ''
  },
  {
    dropdown: false,
    link: '/admin/companies',
    name: 'Empresas',
    icon: 'fa-building',
    permission: ''
  },
  {
    dropdown: true,
    link: '/admin/security',
    name: 'Seguridad',
    icon: 'fa-lock',
    permission: '',
    items: [
      {
        link: '/admin/security/users',
        name: 'Usuarios',
        icon: 'fa-users',
        permission: ''
      },
    ]
  },
];
