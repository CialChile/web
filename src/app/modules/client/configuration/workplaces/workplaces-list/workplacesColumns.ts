import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
export const WORKPLACECOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  },
  {
    name: 'Creado El',
    data: 'created_at',
    sort: true,
    filter: true
  }
];
