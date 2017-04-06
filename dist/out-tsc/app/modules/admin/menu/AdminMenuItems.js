export var ADMINMENUITEMS = [
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
        permission: 'admin-companies.list'
    },
    {
        dropdown: false,
        link: '/admin/templates',
        name: 'Plantillas',
        icon: 'fa-table',
        permission: 'admin-templates.list'
    },
    {
        dropdown: true,
        link: '/admin/security',
        name: 'Seguridad',
        icon: 'fa-lock',
        permission: 'admin-security',
        items: [
            {
                link: '/admin/security/users',
                name: 'Usuarios',
                icon: 'fa-users',
                permission: 'admin-security-users.list'
            },
            {
                link: '/admin/security/roles',
                name: 'Roles',
                icon: 'fa-users',
                permission: 'admin-security-roles.list'
            },
        ]
    },
    {
        dropdown: true,
        link: '/admin/configuration',
        name: 'Configuración',
        icon: 'fa-gear',
        permission: 'admin-configuration',
        items: [
            {
                link: '/admin/configuration/industries',
                name: 'Industrias',
                icon: 'fa-users',
                permission: 'admin-configuration-industries.list'
            },
        ]
    },
];
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/menu/AdminMenuItems.js.map