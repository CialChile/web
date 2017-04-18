import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
export const INSTITUTESCOLUMNS: DataTableColumn[] = [
  {
    name: 'Nombre',
    data: 'name',
    sort: true,
    filter: true
  },
  {
    name: 'Rut',
    data: 'rut',
    sort: true,
    filter: true
  },
  {
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
    name: 'Contacto',
    data: 'contact',
    sort: true,
    filter: true
  }, {
    name: 'Teléfono de contacto',
    data: 'telephone_contact',
    sort: true,
    filter: true
  }, {
    name: 'Email de contacto',
    data: 'email_contact',
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
