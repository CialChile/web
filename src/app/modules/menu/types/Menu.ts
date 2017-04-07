import {MenuItem} from "./MenuItem";
export interface Menu {
  dropdown: boolean;
  link: string;
  name: string;
  items?: MenuItem[];
  icon: string;
  permission: string;
}
