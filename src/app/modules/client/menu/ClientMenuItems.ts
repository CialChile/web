import {Menu} from "../../menu/types/Menu";
export const CLIENTMENUITEMS: Menu[] = [
    {
        dropdown: false,
        link: '/dashboard',
        name: 'Dashboard',
        icon: 'fa-home'
    },
    {
        dropdown: true,
        link: '/actividades',
        name: 'Actividades',
        icon: 'fa-tasks',
        items: [
            {
                link: '/crear',
                name: 'actividades',
                icon: 'fa-home',
            },
            {
                link: '/crear',
                name: 'Plantillas',
                icon: 'fa-home',
            }
        ]
    },
    {
        dropdown: false,
        link: '/activos',
        name: 'Activos',
        icon: 'fa-truck',
    },
    {
        dropdown: false,
        link: '/certificaciones',
        name: 'Certificaciones',
        icon: 'fa-certificate'
    },
    {
        dropdown: true,
        link: '/rrhh',
        name: 'RRHH',
        icon: 'fa-users',
        items: [
            {
                link: '/crear',
                name: 'actividades',
                icon: 'fa-home',
            },
            {
                link: '/crear',
                name: 'Plantillas',
                icon: 'fa-home',
            }
        ]
    },
    {
        dropdown: true,
        link: '/seguridad',
        name: 'Seguridad',
        icon: 'fa-lock',
        items: [
            {
                link: '/crear',
                name: 'Crear',
                icon: 'fa-home',
            }
        ]
    }
];