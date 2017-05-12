import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {ScheduleNaturalLanguageBuilder} from "../../../../utilities/templates/scheduleNaturalLanguageBuilder";
export const ACTIVITYSCHEDULESCOLUMNS: DataTableColumn[] = [
  <DataTableColumn>{
    name: 'Activo',
    data: 'asset.name',
    sort: true,
    filter: true,
    format: (data) => {
      return data.asset.name ? data.asset.name : 'No Aplica'
    }
  }, <DataTableColumn>{
    name: 'Programación',
    data: 'config',
    sort: false,
    filter: true,
    format: (data) => {
      return ScheduleNaturalLanguageBuilder.build(data.config.frequency, data.config.periodicity, data.config.days, data.config.dayOfMonth, data.config.initHour, data.config.estimatedTime, data.config.estimatedTimeUnit)
    }
  }, {
    name: 'Creado El',
    data: 'created_at',
    sort: true,
    filter: true
  }
];
