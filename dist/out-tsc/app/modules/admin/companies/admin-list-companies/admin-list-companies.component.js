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
import { ApiService } from "../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
var AdminListCompaniesComponent = (function () {
    function AdminListCompaniesComponent(datatableService, apiService, router, toastr) {
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
                name: 'Nombre Comercial',
                data: 'commercial_name',
                sort: true,
                filter: true
            }, {
                name: 'Identificación Fiscal',
                data: 'fiscal_identification',
                sort: true,
                filter: true
            }
        ];
    }
    AdminListCompaniesComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].name, value: this.columns[i] });
        }
    };
    AdminListCompaniesComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'admin/company/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.companies = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AdminListCompaniesComponent.prototype.create = function () {
        this.router.navigate(['/admin/companies/create']);
    };
    AdminListCompaniesComponent.prototype.edit = function (company) {
        this.router.navigate(['/admin/companies/' + company.id]);
    };
    AdminListCompaniesComponent.prototype.remove = function (company) {
    };
    AdminListCompaniesComponent.prototype.toggleActive = function (event, company) {
        var _this = this;
        this.apiService.update('admin/company/toggle-active', company.id, company).toPromise().then(function (response) {
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
    Component({
        selector: 'admin-list-companies',
        templateUrl: 'admin-list-companies.component.html',
        styleUrls: ['admin-list-companies.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], AdminListCompaniesComponent);
export { AdminListCompaniesComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-list-companies/admin-list-companies.component.js.map