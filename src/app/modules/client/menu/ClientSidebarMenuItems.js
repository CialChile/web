"use strict";
exports.CLIENTSIDEBARMENUITEMS = [
    {
        dropdown: false,
        link: '/client/dashboard',
        name: 'Dashboard',
        icon: 'fa-home'
    },
    {
        dropdown: true,
        link: '/rrhh',
        name: 'RRHH',
        icon: 'fa-users',
        items: [
            {
                link: '/client/rrhh/workers',
                name: 'Trabajadores',
                icon: 'fa-users',
            },
        ]
    },
    {
        dropdown: true,
        link: '/client/security',
        name: 'Seguridad',
        icon: 'fa-lock',
        items: [
            {
                link: '/client/security/roles',
                name: 'Roles',
                icon: 'fa-users',
            },
            {
                link: '/client/security/users',
                name: 'Usuarios',
                icon: 'fa-users',
            },
        ]
    }
];
