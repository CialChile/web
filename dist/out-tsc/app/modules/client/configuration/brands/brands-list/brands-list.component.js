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
import { BRANDCOLUMNS } from "./brandsColumns";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { ApiService } from "../../../../../services/api.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
var BrandsListComponent = (function () {
    function BrandsListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.brandsColumns = BRANDCOLUMNS;
        this.columns = [];
    }
    BrandsListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.brandsColumns.length; i++) {
            this.columns.push(this.brandsColumns[i]);
            this.columnOptions.push({ label: this.brandsColumns[i].name, value: this.brandsColumns[i] });
        }
    };
    BrandsListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    BrandsListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/config/brands/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.brands = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    BrandsListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.brandsColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.brandsColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.brandsColumns.length; i++) {
            _loop_1(i);
        }
    };
    BrandsListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/brands/create']);
    };
    BrandsListComponent.prototype.edit = function (asset) {
        this.router.navigate(['/client/configuration/brands/' + asset.id]);
    };
    BrandsListComponent.prototype.remove = function (asset) {
        var _this = this;
        this.apiService.destroy('client/assets/config/brands', asset.id).subscribe(function (response) {
            _this.toastr.success('Marca Eliminada con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return BrandsListComponent;
}());
BrandsListComponent = __decorate([
    Component({
        selector: 'app-brands-list',
        templateUrl: './brands-list.component.html',
        styleUrls: ['./brands-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], BrandsListComponent);
export { BrandsListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/brands-list/brands-list.component.js.map