"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var brandsModelsColumns_1 = require("./brandsModelsColumns");
var BrandModelsListComponent = (function () {
    function BrandModelsListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.brandModelsColumns = brandsModelsColumns_1.BRANDMODELSCOLUMNS;
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
    core_1.Component({
        selector: 'app-brand-models-list',
        templateUrl: './brand-models-list.component.html',
        styleUrls: ['./brand-models-list.component.scss']
    })
], BrandModelsListComponent);
exports.BrandModelsListComponent = BrandModelsListComponent;
