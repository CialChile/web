import {Menu} from "../../menu/types/Menu";
export const CLIENTTOPBARMENUITEMS: any[] = [
  {
    dropdown: false,
    link: '/client/my-profile',
    name: 'Mi Perfil',
    icon: 'fa-user'
  },
  {
    dropdown: false,
    link: '/client/my-profile/change-password',
    name: 'Cambiar Contraseña',
    icon: 'fa-lock'
  },
  {
    dropdown: false,
    link: '/client/my-activities',
    name: 'Mis Actividades',
    icon: 'fa-calendar'
  },
  {
    dropdown: false,
    link: '/client/my-schedule',
    name: 'Mi Calendario',
    icon: 'fa-calendar'
  },
];
