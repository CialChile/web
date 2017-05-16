import {DataTableColumn} from "../../../../types/table/data-table-column.type";
export const ACTIVITIESTOEXECUTECOLUMNS: DataTableColumn[] = [
  {
    name: 'Actividad',
    data: 'activitySchedule.activity.name',
    sort: true,
    filter: true
  },
  {
    name: 'Fecha de Ejecución',
    data: 'execution_date',
    sort: true,
    filter: true
  }, <DataTableColumn>{
    name: 'Estado',
    data: 'status.name',
    sort: false,
    filter: true,
    format: (data) => {
      return '<span class="label label-' + data.status.severity + '">' + data.status.name + '</span>'
    }
  }
];
