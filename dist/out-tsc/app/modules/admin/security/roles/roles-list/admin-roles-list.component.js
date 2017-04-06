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
var AdminRolesListComponent = (function () {
    function AdminRolesListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.columns = [];
        this.roleColumns = [
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
    AdminRolesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.roleColumns.length; i++) {
            if (i < 2) {
                this.columns.push(this.roleColumns[i]);
            }
            this.columnOptions.push({ label: this.roleColumns[i].name, value: this.roleColumns[i] });
        }
    };
    AdminRolesListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    AdminRolesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'admin/roles/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.roles = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AdminRolesListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.roleColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.roleColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.roleColumns.length; i++) {
            _loop_1(i);
        }
    };
    AdminRolesListComponent.prototype.create = function () {
        this.router.navigate(['/admin/security/roles/create']);
    };
    AdminRolesListComponent.prototype.edit = function (role) {
        this.router.navigate(['/admin/security/roles/' + role.id]);
    };
    AdminRolesListComponent.prototype.remove = function (role) {
        var _this = this;
        this.apiService.destroy('admin/roles', role.id).subscribe(function (response) {
            _this.toastr.success('Rol Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        });
    };
    AdminRolesListComponent.prototype.ngOnDestroy = function () {
    };
    return AdminRolesListComponent;
}());
AdminRolesListComponent = __decorate([
    Component({
        selector: 'app-admin-roles-list',
        templateUrl: './admin-roles-list.component.html',
        styleUrls: ['./admin-roles-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], AdminRolesListComponent);
export { AdminRolesListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/security/roles/roles-list/admin-roles-list.component.js.map