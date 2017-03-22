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
import { DatatableService } from "../../../../services/datatable/datatable.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { ApiService } from "../../../../services/api.service";
var AssetsListComponent = (function () {
    function AssetsListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
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
                title: 'Activos',
                link: '/client/assets',
                active: true
            },
        ];
    }
    AssetsListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].name, value: this.columns[i] });
        }
    };
    AssetsListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.workers = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AssetsListComponent.prototype.create = function () {
        this.router.navigate(['/client/rrhh/assets/create']);
    };
    AssetsListComponent.prototype.edit = function (worker) {
        this.router.navigate(['/client/rrhh/assets/' + worker.id]);
    };
    AssetsListComponent.prototype.remove = function (worker) {
        var _this = this;
        this.apiService.destroy('client/assets', worker.id).subscribe(function (response) {
            _this.toastr.success('Trabajador Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return AssetsListComponent;
}());
AssetsListComponent = __decorate([
    Component({
        selector: 'app-assets-list',
        templateUrl: './assets-list.component.html',
        styleUrls: ['./assets-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], AssetsListComponent);
export { AssetsListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/assets/assets-list/assets-list.component.js.map