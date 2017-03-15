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
export let DatatableService = class DatatableService {
    constructor() {
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
    init(url, columns, include) {
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
        };
    }
};
DatatableService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], DatatableService);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/datatable/datatable.service.js.map