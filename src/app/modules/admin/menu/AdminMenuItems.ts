import {Menu} from "../../menu/types/Menu";
export const ADMINMENUITEMS: Menu[] = [
  {
    dropdown: false,
    link: '/admin/console/dashboard',
    name: 'Dashboard',
    icon: 'fa-home',
    permission: ''
  },
  {
    dropdown: false,
    link: '/admin/console/companies',
    name: 'Empresas',
    icon: 'fa-building',
    permission: 'admin-companies.list'
  },
  {
    dropdown: true,
    link: '/admin/console/activities',
    name: 'Actividades',
    icon: 'fa-table',
    permission: 'admin-activities',
    items: [
      {
        link: '/admin/console/activities/templates',
        name: 'Plantillas',
        icon: 'fa-table',
        permission: 'admin-templates.list'
      },
      {
        link: '/admin/console/activities/program-types',
        name: 'Tipos De Programas',
        icon: 'fa-users',
        permission: 'admin-program-types.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/admin/console/security',
    name: 'Seguridad',
    icon: 'fa-lock',
    permission: 'admin-security',
    items: [
      {
        link: '/admin/console/security/users',
        name: 'Usuarios',
        icon: 'fa-users',
        permission: 'admin-security-users.list'
      },
      {
        link: '/admin/console/security/roles',
        name: 'Roles',
        icon: 'fa-users',
        permission: 'admin-security-roles.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/admin/console/configuration',
    name: 'Configuración',
    icon: 'fa-gear',
    permission: 'admin-configuration',
    items: [
      {
        link: '/admin/console/configuration/industries',
        name: 'Industrias',
        icon: 'fa-users',
        permission: 'admin-configuration-industries.list'
      },
    ]
  },
];
