import {MenuItem} from "./MenuItem";
export class Menu {
    dropdown: boolean;
    link: string;
    name: string;
    items?: MenuItem[];
    icon: string;
}