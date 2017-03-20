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
var UsersListComponent = (function () {
    function UsersListComponent(datatableService, apiService, router, toastr) {
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
                name: 'Correo Electrónico',
                data: 'email',
                sort: true,
                filter: true
            }, {
                name: 'Rol',
                data: 'role.name',
                sort: false,
                filter: false
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
                title: 'Usuarios',
                link: '/client/security/users',
                active: true
            }
        ];
    }
    UsersListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].name, value: this.columns[i] });
        }
    };
    UsersListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/secure-user/datatable', 'role', this.globalSearch)
            .toPromise().then(function (response) {
            _this.users = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    UsersListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/users/create']);
    };
    UsersListComponent.prototype.edit = function (user) {
        this.router.navigate(['/client/security/users/' + user.id]);
    };
    UsersListComponent.prototype.remove = function (user) {
        var _this = this;
        this.apiService.destroy('client/secure-user', user.id).subscribe(function (response) {
            _this.toastr.success('Usuario Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        });
    };
    UsersListComponent.prototype.ngOnDestroy = function () {
    };
    return UsersListComponent;
}());
UsersListComponent = __decorate([
    Component({
        selector: 'app-users-list',
        templateUrl: './users-list.component.html',
        styleUrls: ['./users-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], UsersListComponent);
export { UsersListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/users/users-list/users-list.component.js.map