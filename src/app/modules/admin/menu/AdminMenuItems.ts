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
  }
];
