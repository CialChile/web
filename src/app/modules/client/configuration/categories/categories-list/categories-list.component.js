"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var categoriesColumns_1 = require("./categoriesColumns");
var CategoriesListComponent = (function () {
    function CategoriesListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.categoriesColumns = categoriesColumns_1.CATEGORIESCOLUMNS;
        this.columns = [];
    }
    CategoriesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.categoriesColumns.length; i++) {
            this.columns.push(this.categoriesColumns[i]);
            this.columnOptions.push({ label: this.categoriesColumns[i].name, value: this.categoriesColumns[i] });
        }
    };
    CategoriesListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    CategoriesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/config/categories/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.categories = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    CategoriesListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.categoriesColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.categoriesColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.categoriesColumns.length; i++) {
            _loop_1(i);
        }
    };
    CategoriesListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/categories/create']);
    };
    CategoriesListComponent.prototype.edit = function (asset) {
        this.router.navigate(['/client/configuration/categories/' + asset.id]);
    };
    CategoriesListComponent.prototype.remove = function (asset) {
        var _this = this;
        this.apiService.destroy('client/assets/config/categories', asset.id).subscribe(function (response) {
            _this.toastr.success('Categoría Eliminada con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return CategoriesListComponent;
}());
CategoriesListComponent = __decorate([
    core_1.Component({
        selector: 'app-categories-list',
        templateUrl: './categories-list.component.html',
        styleUrls: ['./categories-list.component.scss']
    })
], CategoriesListComponent);
exports.CategoriesListComponent = CategoriesListComponent;
