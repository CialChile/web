import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
export const SUBCATEGORIESCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  },
  {
    name: 'Categoría',
    data: 'category.name',
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
