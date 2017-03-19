"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RolesListComponent = (function () {
    function RolesListComponent(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.columns = [
            {
                name: 'Nombre',
                data: 'name',
                orderable: true,
                searchable: true,
                render: function (data) {
                    return "<a class=\"btn btn-default\" (click)=\"alertar()\"> " + data + "</a>";
                }
            }, {
                name: 'Descripción',
                data: 'description',
                orderable: true,
                searchable: true
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
        var _this = this;
        this.apiService.all('client/role/datatable').subscribe(function (response) { return _this.roles = response.data; });
    };
    RolesListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/roles/create']);
    };
    RolesListComponent.prototype.edit = function () {
        this.router.navigate(['/client/security/roles/']);
    };
    RolesListComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/role', 1).subscribe(function (response) {
            _this.toastr.success('Rol Eliminado con Exito');
        });
    };
    RolesListComponent.prototype.ngOnDestroy = function () {
        this.eventsService.off('menu-toggle');
    };
    RolesListComponent = __decorate([
        core_1.Component({
            selector: 'app-roles-list',
            templateUrl: './roles-list.component.html',
            styleUrls: ['./roles-list.component.scss']
        })
    ], RolesListComponent);
    return RolesListComponent;
}());
exports.RolesListComponent = RolesListComponent;
