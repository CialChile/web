"use strict";
exports.CLIENTSIDEBARMENUITEMS = [
    {
        dropdown: false,
        link: '/client/dashboard',
        name: 'Dashboard',
        icon: 'fa-home',
        permission: ''
    },
    {
        dropdown: true,
        link: '/rrhh',
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
    }
];
