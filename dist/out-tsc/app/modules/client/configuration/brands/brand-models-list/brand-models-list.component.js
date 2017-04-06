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
import { BRANDMODELSCOLUMNS } from "./brandsModelsColumns";
var BrandModelsListComponent = (function () {
    function BrandModelsListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.brandModelsColumns = BRANDMODELSCOLUMNS;
        this.columns = [];
    }
    BrandModelsListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.brandModelsColumns.length; i++) {
            this.columns.push(this.brandModelsColumns[i]);
            this.columnOptions.push({ label: this.brandModelsColumns[i].name, value: this.brandModelsColumns[i] });
        }
    };
    BrandModelsListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    BrandModelsListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/config/brands/null/brand-models/datatable', 'brand', this.globalSearch)
            .toPromise().then(function (response) {
            _this.brandModels = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    BrandModelsListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.brandModelsColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.brandModelsColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.brandModelsColumns.length; i++) {
            _loop_1(i);
        }
    };
    BrandModelsListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/brands/brand-models/create']);
    };
    BrandModelsListComponent.prototype.edit = function (brandModel) {
        this.router.navigate(['/client/configuration/brands/' + brandModel.brand.id + '/brand-models/' + brandModel.id]);
    };
    BrandModelsListComponent.prototype.remove = function (brandModel) {
        var _this = this;
        this.apiService.destroy('client/assets/config/brands/' + brandModel.brand.id + '/brand-models', brandModel.id).subscribe(function (response) {
            _this.toastr.success('Modelo Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return BrandModelsListComponent;
}());
BrandModelsListComponent = __decorate([
    Component({
        selector: 'app-brand-models-list',
        templateUrl: './brand-models-list.component.html',
        styleUrls: ['./brand-models-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], BrandModelsListComponent);
export { BrandModelsListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/brand-models-list/brand-models-list.component.js.map