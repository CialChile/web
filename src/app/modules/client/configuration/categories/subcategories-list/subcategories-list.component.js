"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var subcategoriesColumns_1 = require("./subcategoriesColumns");
var SubcategoriesListComponent = (function () {
    function SubcategoriesListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.subcategoriesColumns = subcategoriesColumns_1.SUBCATEGORIESCOLUMNS;
        this.columns = [];
    }
    SubcategoriesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.subcategoriesColumns.length; i++) {
            this.columns.push(this.subcategoriesColumns[i]);
            this.columnOptions.push({ label: this.subcategoriesColumns[i].name, value: this.subcategoriesColumns[i] });
        }
    };
    SubcategoriesListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    SubcategoriesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/config/categories/null/subcategories/datatable', 'category', this.globalSearch)
            .toPromise().then(function (response) {
            _this.subcategories = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    SubcategoriesListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.subcategoriesColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.subcategoriesColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.subcategoriesColumns.length; i++) {
            _loop_1(i);
        }
    };
    SubcategoriesListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/categories/subcategories/create']);
    };
    SubcategoriesListComponent.prototype.edit = function (subcategory) {
        this.router.navigate(['/client/configuration/categories/' + subcategory.category.id + '/subcategories/' + subcategory.id]);
    };
    SubcategoriesListComponent.prototype.remove = function (subcategory) {
        var _this = this;
        this.apiService.destroy('client/assets/config/brands/' + subcategory.category.id + '/brand-models', subcategory.id).subscribe(function (response) {
            _this.toastr.success('Subcategoría Eliminada con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return SubcategoriesListComponent;
}());
SubcategoriesListComponent = __decorate([
    core_1.Component({
        selector: 'app-subcategories-list',
        templateUrl: './subcategories-list.component.html',
        styleUrls: ['./subcategories-list.component.scss']
    })
], SubcategoriesListComponent);
exports.SubcategoriesListComponent = SubcategoriesListComponent;
