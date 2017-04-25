"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdminListCompaniesComponent = (function () {
    function AdminListCompaniesComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.columns = [];
        this.companiesColumns = [
            {
                name: 'Nombre',
                data: 'name',
                sort: true,
                filter: true,
            }, {
                name: 'Nombre Comercial',
                data: 'commercial_name',
                sort: true,
                filter: true
            }, {
                name: 'Identificación Fiscal',
                data: 'fiscal_identification',
                sort: true,
                filter: true
            }, {
                name: 'Nº de usuarios',
                data: 'users_number',
                sort: true,
                filter: true
            }
        ];
        this.stacked = false;
    }
    AdminListCompaniesComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.companiesColumns.length; i++) {
            if (i < 4) {
                this.columns.push(this.companiesColumns[i]);
            }
            this.columnOptions.push({ label: this.companiesColumns[i].name, value: this.companiesColumns[i] });
        }
    };
    AdminListCompaniesComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'admin/companies/datatable', 'responsible', this.globalSearch)
            .toPromise().then(function (response) {
            _this.companies = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AdminListCompaniesComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.companiesColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.companiesColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.companiesColumns.length; i++) {
            _loop_1(i);
        }
        this.stacked = this.columns.length > 4;
    };
    AdminListCompaniesComponent.prototype.create = function () {
        this.router.navigate(['/admin/console/companies/create']);
    };
    AdminListCompaniesComponent.prototype.edit = function (company) {
        this.router.navigate(['/admin/console/companies/' + company.id]);
    };
    AdminListCompaniesComponent.prototype.remove = function (company) {
    };
    AdminListCompaniesComponent.prototype.toggleActive = function (event, company) {
        var _this = this;
        this.apiService.update('admin/companies/toggle-active', company.id, company).toPromise().then(function (response) {
            if (company.active) {
                _this.toastr.success('La empresa ' + company.name + ' fue activada');
            }
            else {
                _this.toastr.success('La empresa ' + company.name + ' fue desactivada');
            }
        });
    };
    AdminListCompaniesComponent.prototype.ngOnDestroy = function () {
    };
    return AdminListCompaniesComponent;
}());
AdminListCompaniesComponent = __decorate([
    core_1.Component({
        selector: 'admin-list-companies',
        templateUrl: 'admin-list-companies.component.html',
        styleUrls: ['admin-list-companies.component.scss']
    })
], AdminListCompaniesComponent);
exports.AdminListCompaniesComponent = AdminListCompaniesComponent;
