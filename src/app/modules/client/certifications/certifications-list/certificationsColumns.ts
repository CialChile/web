import {DataTableColumn} from "../../../../types/table/data-table-column.type";

export const CERTIFICATIONSCOLUMNS: DataTableColumn[] = [
  {
    name: 'Código',
    data: 'sku',
    sort: true,
    filter: true
  },
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  },
  {
    name: 'Tiempo de Validez',
    data: 'validity_time_formatted',
    sort: false,
    filter: false
  },
  {
    name: 'Status',
    data: 'status.name',
    sort: true,
    filter: true
  },
  {
    name: 'Instituto',
    data: 'institute.name',
    sort: true,
    filter: true
  }
];
