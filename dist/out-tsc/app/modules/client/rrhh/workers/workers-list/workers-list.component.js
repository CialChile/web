var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataTableDirective } from "../../../../../directives/datatable/angular-datatables.directive";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { EventsService } from "../../../../../services/events/events.service";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
export let WorkersListComponent = class WorkersListComponent {
    constructor(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.dtOptions = {};
        this.selectedWorker = null;
        this.selectedRowId = null;
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'RRHH',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Trabajadores',
                link: '/client/rrhh/workers',
                active: true
            }
        ];
        this.eventsService.on('menu-toggle', () => {
            console.log('hole');
        });
    }
    ngOnInit() {
        const columns = [{
                title: 'Nombre',
                data: 'first_name'
            }, {
                title: 'Apellido',
                data: 'last_name'
            }, {
                title: 'Rut/Pasaporte',
                data: 'rut_passport'
            }, {
                title: 'Cargo',
                data: 'position'
            }];
        this.dtOptions = this.datatableService.init('client/worker/datatable', columns);
        this.dtOptions.rowCallback = (nRow, aData) => {
            let self = this;
            if (aData.id == self.selectedRowId) {
                $(nRow).children().addClass('row-selected');
            }
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', () => {
                let id = aData.id;
                if (id === self.selectedRowId) {
                    self.selectedRowId = null;
                }
                else {
                    self.selectedRowId = id;
                }
                if ($('td', nRow).hasClass('row-selected')) {
                    $('td', nRow).removeClass('row-selected');
                    self.selectedWorker = null;
                }
                else {
                    $('td.row-selected').removeClass('row-selected');
                    $('td', nRow).addClass('row-selected');
                    self.rowClicked(aData);
                }
            });
        };
    }
    rowClicked(data) {
        this.selectedWorker = data;
    }
    create() {
        this.router.navigate(['/client/rrhh/workers/create']);
    }
    edit() {
        this.router.navigate(['/client/rrhh/workers/' + this.selectedWorker.id]);
    }
    remove() {
        this.apiService.destroy('client/worker', this.selectedWorker.id).subscribe((response) => {
            this.toastr.success('Trabajador Eliminado con Exito');
            this.selectedWorker = null;
            this.datatableEl.dtInstance.then((dtInstance) => {
                dtInstance.ajax.reload();
            });
        }, (error) => {
            this.toastr.error(error);
        });
    }
    ngOnDestroy() {
        this.eventsService.off('menu-toggle');
    }
};
__decorate([
    ViewChild(DataTableDirective), 
    __metadata('design:type', DataTableDirective)
], WorkersListComponent.prototype, "datatableEl", void 0);
WorkersListComponent = __decorate([
    Component({
        selector: 'app-workers-list',
        templateUrl: 'workers-list.component.html',
        styleUrls: ['workers-list.component.scss']
    }), 
    __metadata('design:paramtypes', [DatatableService, ApiService, EventsService, Router, ToastsManager])
], WorkersListComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/rrhh/workers/workers-list/workers-list.component.js.map