import {DataTableColumn} from "../../../../../types/table/data-table-column.type";

export const WORKERSCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'first_name',
    sort: true,
    filter: true,
  }, {
    name: 'Apellido',
    data: 'last_name',
    sort: true,
    filter: true
  }, {
    name: 'Rut/Pasaporte',
    data: 'rut_passport',
    sort: true,
    filter: true
  }, {
    name: 'Cargo',
    data: 'position',
    sort: true,
    filter: true
  }, {
    name: 'Especialidad',
    data: 'specialty',
    sort: true,
    filter: true
  }, {
    name: 'Fecha de Nacimiento',
    data: 'birthday',
    sort: true,
    filter: true
  }, {
    name: 'Dirección',
    data: 'address',
    sort: true,
    filter: true
  }, {
    name: 'País',
    data: 'country',
    sort: true,
    filter: true
  }, {
    name: 'Estado o Provincía',
    data: 'state',
    sort: true,
    filter: true
  }, {
    name: 'Ciudad',
    data: 'city',
    sort: true,
    filter: true
  }, {
    name: 'Teléfono',
    data: 'telephone',
    sort: true,
    filter: true
  }
];
