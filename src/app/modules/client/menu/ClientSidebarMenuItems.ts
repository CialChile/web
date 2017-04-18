import {Menu} from "../../menu/types/Menu";
export const CLIENTSIDEBARMENUITEMS: Menu[] = [
  {
    dropdown: false,
    link: '/client/dashboard',
    name: 'Dashboard',
    icon: 'fa-home',
    permission: ''
  },
  {
    dropdown: true,
    link: '/client/assets',
    name: 'Activos',
    icon: 'fa-database',
    permission: 'client-assets',
    items: [
      {
        link: '/client/assets',
        name: 'Activos',
        icon: 'fa-users',
        permission: 'client-assets.list'
      },
      {
        link: '/client/configuration/assets',
        name: 'Configuración',
        icon: 'fa-users',
        permission: 'client-assets.store'
      },
      {
        link: '/client/configuration/brands',
        name: 'Marcas',
        icon: 'fa-users',
        permission: 'client-config-assets-brands.list'
      },
      {
        link: '/client/configuration/brands/brand-models',
        name: 'Modelos',
        icon: 'fa-users',
        permission: 'client-config-assets-brand-models.list'
      },
      {
        link: '/client/configuration/categories',
        name: 'Categorías',
        icon: 'fa-users',
        permission: 'client-config-assets-categories.list'
      },
      {
        link: '/client/configuration/categories/subcategories',
        name: 'Subcategorías',
        icon: 'fa-users',
        permission: 'client-config-assets-subcategories.list'
      },
      {
        link: '/client/configuration/workplaces',
        name: 'Lugares de Trabajo',
        icon: 'fa-users',
        permission: 'client-config-assets-workplaces.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/client/activities',
    name: 'Actividades',
    icon: 'fa-calendar',
    permission: 'client-activities',
    items: [
      {
        link: '/client/activities',
        name: 'Actividades',
        icon: 'fa-users',
        permission: 'client-activities-activities.list'
      },
      {
        link: '/client/activities/templates',
        name: 'Plantillas',
        icon: 'fa-users',
        permission: 'client-activities-templates.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/client/rrhh',
    name: 'RRHH',
    icon: 'fa-users',
    permission: 'client-rrhh',
    items: [
      {
        link: '/client/rrhh/workers',
        name: 'Trabajadores',
        icon: 'fa-users',
        permission: 'client-rrhh-workers.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/client/certifications',
    name: 'Certificación',
    icon: 'fa-certificate',
    permission: 'client-certifications',
    items: [
      {
        link: '/client/certifications/list',
        name: 'Certificaciones',
        icon: 'fa-users',
        permission: 'client-certifications-certifications.list'
      },
      {
        link: '/client/certifications/config/institutes',
        name: 'Institutos',
        icon: 'fa-users',
        permission: 'client-certifications-institutes.list'
      },
    ]
  },

  {
    dropdown: true,
    link: '/client/security',
    name: 'Seguridad',
    icon: 'fa-lock',
    permission: 'client-security',
    items: [
      {
        link: '/client/security/roles',
        name: 'Roles',
        icon: 'fa-users',
        permission: 'client-roles.list'
      },
      {
        link: '/client/security/users',
        name: 'Usuarios',
        icon: 'fa-users',
        permission: 'client-users.list'
      },
    ]
  },
  {
    dropdown: true,
    link: '/client/configuration',
    name: 'Configuración',
    icon: 'fa-gear',
    permission: 'client-configuration',
    items: [
      {
        link: '/client/configuration/status',
        name: 'Status',
        icon: 'fa-users',
        permission: 'client-config-status.show'
      },
    ]
  }
];
