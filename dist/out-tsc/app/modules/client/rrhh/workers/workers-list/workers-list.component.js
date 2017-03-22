var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
var WorkersListComponent = (function () {
    function WorkersListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.defaultImage = 'assets/img/missing.png';
        this.tableView = true;
        this.columns = [
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
            }
        ];
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
    }
    WorkersListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].name, value: this.columns[i] });
        }
    };
    WorkersListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    WorkersListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/workers/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.workers = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    WorkersListComponent.prototype.showDetail = function (worker) {
        this.selectedWorker = worker;
        this.displayDetails = true;
    };
    WorkersListComponent.prototype.onDialogHide = function () {
        this.selectedWorker = null;
    };
    WorkersListComponent.prototype.create = function () {
        this.router.navigate(['/client/rrhh/workers/create']);
    };
    WorkersListComponent.prototype.edit = function (worker) {
        this.router.navigate(['/client/rrhh/workers/' + worker.id]);
    };
    WorkersListComponent.prototype.remove = function (worker) {
        var _this = this;
        this.apiService.destroy('client/workers', worker.id).subscribe(function (response) {
            _this.toastr.success('Trabajador Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return WorkersListComponent;
}());
WorkersListComponent = __decorate([
    Component({
        selector: 'app-workers-list',
        templateUrl: 'workers-list.component.html',
        styleUrls: ['workers-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], WorkersListComponent);
export { WorkersListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/rrhh/workers/workers-list/workers-list.component.js.map