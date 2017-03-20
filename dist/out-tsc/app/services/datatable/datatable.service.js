var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from "../api.service";
import { URLSearchParams } from "@angular/http";
import { objectToParams } from "../../utilities/url/objectToParams";
var DatatableService = (function () {
    function DatatableService(apiService) {
        this.apiService = apiService;
        this.baseUrl = environment.baseUrl;
        this.language = {
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
    }
    DatatableService.prototype.init = function (url, columns, include) {
        var tableUrl = this.baseUrl + url + '?token=' + localStorage.getItem('token');
        tableUrl = include ? tableUrl + "&include=" + include : tableUrl;
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
        };
    };
    DatatableService.prototype.getData = function (event, columns, url, include, search) {
        var order;
        var columnFilter;
        if (event.sortField) {
            columnFilter = columns.filter(function (column) {
                return column.data == event.sortField;
            });
            if (columnFilter && event.sortOrder != 0) {
                order = [{
                        column: columns.indexOf(columnFilter[0]),
                        dir: event.sortOrder > 0 ? 'asc' : event.sortOrder < 0 ? 'desc' : ''
                    }];
            }
        }
        var input = new URLSearchParams(objectToParams({
            draw: "1",
            include: include ? include : '',
            columns: columns.map(function (column) {
                return {
                    data: column.data,
                    name: column.data,
                    searchable: column.filter,
                    orderable: column.sort,
                    search: { value: "", regex: false }
                };
            }),
            order: order,
            start: event.first,
            length: event.rows,
            search: { value: search ? search : '', regex: "false" },
        }));
        return this.apiService.all(url, null, { search: input });
    };
    return DatatableService;
}());
DatatableService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApiService])
], DatatableService);
export { DatatableService };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/datatable/datatable.service.js.map