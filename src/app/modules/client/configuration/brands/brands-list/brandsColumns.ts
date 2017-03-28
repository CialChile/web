import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
export const BRANDCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  },
  {
    name: 'Creada El',
    data: 'created_at',
    sort: true,
    filter: true
  }
];
