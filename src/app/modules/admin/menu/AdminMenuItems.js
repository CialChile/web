"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMINMENUITEMS = [
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
        permission: ''
    },
    {
        dropdown: true,
        link: '/admin/console/security',
        name: 'Seguridad',
        icon: 'fa-lock',
        permission: '',
        items: [
            {
                link: '/admin/console/security/users',
                name: 'Usuarios',
                icon: 'fa-users',
                permission: ''
            },
        ]
    },
];
