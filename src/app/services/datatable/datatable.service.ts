import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment'
import {DataTableColumn} from "../../types/table/data-table-column.type";
import {ApiService} from "../api.service";
import {URLSearchParams} from "@angular/http";
import {objectToParams} from "../../utilities/url/objectToParams";

@Injectable()
export class DatatableService {
  private baseUrl = environment.baseUrl;
  private language = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Último",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    select: {
      rows: {
        _: "",
        0: "",
        1: ""
      }
    }
  };

  constructor(private apiService: ApiService) {
  }

  init(url: string, columns: any[], include?: string) {

    let tableUrl = this.baseUrl + url + '?token=' + localStorage.getItem('token');
    tableUrl = include ? `${tableUrl}&include=${include}` : tableUrl;
    return {
      ajax: tableUrl,
      columns: columns,
      language: this.language,
      serverSide: true,
      procesing: true,
      responsive: true,
      dom: "<'row'<'col-sm-6 col-xs-12'l><'col-sm-6 col-xs-12'f>>" +
      "<'row'<'col-xs-12 col-sm-12'tr>>" +
      "<'row'<'col-xs-12 col-sm-5'i><'col-xs-12 col-sm-7'p>>",

    }
  }

  getData(event, columns: DataTableColumn[], url: string, include?: string, search?: string) {
    let order;
    let columnFilter;
    if (event.sortField) {
      columnFilter = columns.filter((column) => {
        return column.data == event.sortField;
      })

      if (columnFilter && event.sortOrder != 0) {
        order = [{
          column: columns.indexOf(columnFilter[0]),
          dir: event.sortOrder > 0 ? 'asc' : event.sortOrder < 0 ? 'desc' : ''
        }]
      }
    }
    let input: URLSearchParams = new URLSearchParams(objectToParams({
      draw: "1",
      include: include ? include : '',
      columns: columns.map((column) => {
        return {
          data: column.data,
          name: column.data,
          searchable: column.filter,
          orderable: column.sort,
          search: {value: "", regex: false}
        }
      }),
      order: order,
      start: event.first,
      length: event.rows,
      search: {value: search ? search : '', regex: "false"},
    }));

    return this.apiService.all(url, null, {search: input});
  }

}
