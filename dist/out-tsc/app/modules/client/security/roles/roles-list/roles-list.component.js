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
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { Router } from "@angular/router";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
var RolesListComponent = (function () {
    function RolesListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.columns = [
            {
                name: 'Nombre',
                data: 'name',
                sort: true,
                filter: true,
            }, {
                name: 'Descripción',
                data: 'description',
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
                title: 'Seguridad',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Roles',
                link: '/client/security/roles',
                active: true
            }
        ];
    }
    RolesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].name, value: this.columns[i] });
        }
    };
    RolesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/role/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.roles = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    RolesListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/roles/create']);
    };
    RolesListComponent.prototype.edit = function (role) {
        this.router.navigate(['/client/security/roles/' + role.id]);
    };
    RolesListComponent.prototype.remove = function (role) {
        var _this = this;
        this.apiService.destroy('client/role', role.id).subscribe(function (response) {
            _this.toastr.success('Rol Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        });
    };
    RolesListComponent.prototype.ngOnDestroy = function () {
    };
    return RolesListComponent;
}());
RolesListComponent = __decorate([
    Component({
        selector: 'app-roles-list',
        templateUrl: './roles-list.component.html',
        styleUrls: ['./roles-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], RolesListComponent);
export { RolesListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/roles/roles-list/roles-list.component.js.map