import {DataTableColumn} from "../../../../types/table/data-table-column.type";
export const ACTIVITIESCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  }, {
    name: 'Plantilla',
    data: 'template.name',
    sort: true,
    filter: true,
  }, {
    name: 'Programa',
    data: 'programType.name',
    sort: true,
    filter: true
  }, {
    name: 'Creado El',
    data: 'created_at',
    sort: true,
    filter: true
  }
];
