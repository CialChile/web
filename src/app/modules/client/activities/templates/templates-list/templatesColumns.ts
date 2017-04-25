import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
export const TEMPLATESCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  }, <DataTableColumn>{
    name: 'Tipo de Plantilla',
    data: 'is_custom',
    sort: true,
    filter: true,
    format: (data) => {
      return data.is_custom ? '<span class="label label-success">Personalizada</span>' : '<span class="label label-info">Estandar</span>'
    }
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
