"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RolesListComponent = (function () {
    function RolesListComponent(datatableService, apiService, router, toastr) {
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
    RolesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.roleColumns.length; i++) {
            if (i < 2) {
                this.columns.push(this.roleColumns[i]);
            }
            this.columnOptions.push({ label: this.roleColumns[i].name, value: this.roleColumns[i] });
        }
    };
    RolesListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    RolesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/roles/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.roles = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    RolesListComponent.prototype.columnsChange = function (event) {
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
    RolesListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/roles/create']);
    };
    RolesListComponent.prototype.edit = function (role) {
        this.router.navigate(['/client/security/roles/' + role.id]);
    };
    RolesListComponent.prototype.remove = function (role) {
        var _this = this;
        this.apiService.destroy('client/roles', role.id).subscribe(function (response) {
            _this.toastr.success('Rol Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        });
    };
    RolesListComponent.prototype.ngOnDestroy = function () {
    };
    return RolesListComponent;
}());
RolesListComponent = __decorate([
    core_1.Component({
        selector: 'app-roles-list',
        templateUrl: './roles-list.component.html',
        styleUrls: ['./roles-list.component.scss']
    })
], RolesListComponent);
exports.RolesListComponent = RolesListComponent;
