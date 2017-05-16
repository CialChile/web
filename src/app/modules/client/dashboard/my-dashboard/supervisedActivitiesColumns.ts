import {DataTableColumn} from "../../../../types/table/data-table-column.type";
export const SUPERVISEDACTIVITIESCOLUMNS: DataTableColumn[] = [
  {
    name: 'Actividad',
    data: 'activitySchedule.activity.name',
    sort: true,
    filter: true
  },
  {
    name: 'Fecha a Ejecutar',
    data: 'execution_date',
    sort: true,
    filter: true
  }, <DataTableColumn>{
    name: 'Fecha de Ejecución',
    data: 'executed_date',
    sort: true,
    filter: true,
    format: (data) => {
      return data.executed_date ? data.executed_date : 'Aún no se ha ejecutado'
    }
  }, <DataTableColumn>{
    name: 'Estado',
    data: 'status.name',
    sort: true,
    filter: true,
    format: (data) => {
      return '<span class="label label-' + data.status.severity + '">' + data.status.name + '</span>'
    }
  }
];
