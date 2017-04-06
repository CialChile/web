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
import { ApiService } from "../../../../../services/api.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
var AdminUsersListComponent = (function () {
    function AdminUsersListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.columns = [];
        this.userColumns = [
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
                name: 'Correo Electrónico',
                data: 'email',
                sort: true,
                filter: true
            }
        ];
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/admin/dashboard',
                active: false
            },
            {
                title: 'Seguridad',
                link: '/admin/dashboard',
                active: false
            },
            {
                title: 'Usuarios',
                link: '/admin/security/users',
                active: true
            }
        ];
    }
    AdminUsersListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.userColumns.length; i++) {
            if (i < 4) {
                this.columns.push(this.userColumns[i]);
            }
            this.columnOptions.push({ label: this.userColumns[i].name, value: this.userColumns[i] });
        }
    };
    AdminUsersListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    AdminUsersListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'admin/users/datatable', this.globalSearch)
            .toPromise().then(function (response) {
            _this.users = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AdminUsersListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.userColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.userColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.userColumns.length; i++) {
            _loop_1(i);
        }
    };
    AdminUsersListComponent.prototype.create = function () {
        this.router.navigate(['/admin/security/users/create']);
    };
    AdminUsersListComponent.prototype.edit = function (user) {
        this.router.navigate(['/admin/security/users/' + user.id]);
    };
    AdminUsersListComponent.prototype.remove = function (user) {
        var _this = this;
        this.apiService.destroy('admin/users', user.id).subscribe(function (response) {
            _this.toastr.success('Usuario Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        });
    };
    AdminUsersListComponent.prototype.ngOnDestroy = function () {
    };
    return AdminUsersListComponent;
}());
AdminUsersListComponent = __decorate([
    Component({
        selector: 'app-admin-users-list',
        templateUrl: './admin-users-list.component.html',
        styleUrls: ['./admin-users-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], AdminUsersListComponent);
export { AdminUsersListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/security/users/users-list/admin-users-list.component.js.map