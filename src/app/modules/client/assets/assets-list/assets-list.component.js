"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var assetsColumns_1 = require("./assetsColumns");
var AssetsListComponent = (function () {
    function AssetsListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.defaultImage = 'assets/img/missing/assets/missing.jpg';
        this.tableView = true;
        this.assetsColumns = assetsColumns_1.ASSETSCOLUMNS;
        this.columns = [];
    }
    AssetsListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.assetsColumns.length; i++) {
            if (i < 3) {
                this.columns.push(this.assetsColumns[i]);
            }
            this.columnOptions.push({ label: this.assetsColumns[i].name, value: this.assetsColumns[i] });
        }
    };
    AssetsListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    AssetsListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/datatable', 'brand,brandModel,category,subcategory,workplace,status,coverImage', this.globalSearch)
            .toPromise().then(function (response) {
            _this.assets = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    AssetsListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.assetsColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.assetsColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.assetsColumns.length; i++) {
            _loop_1(i);
        }
    };
    AssetsListComponent.prototype.getData = function (asset, property) {
        var properties = property.split('.');
        if (properties.length > 1) {
            return this.getData(asset[properties[0]], properties.reduce(function (previous, actual, index) {
                if (index != 1) {
                    return previous + '.' + actual;
                }
                return actual;
            }));
        }
        return asset[property];
    };
    AssetsListComponent.prototype.showDetail = function (asset) {
        this.router.navigate(['/client/assets/' + asset.id + '/info']);
    };
    AssetsListComponent.prototype.create = function () {
        this.router.navigate(['/client/assets/create']);
    };
    AssetsListComponent.prototype.edit = function (asset) {
        this.router.navigate(['/client/assets/' + asset.id]);
    };
    AssetsListComponent.prototype.remove = function (asset) {
        var _this = this;
        this.apiService.destroy('client/assets', asset.id).subscribe(function (response) {
            _this.toastr.success('Activo Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return AssetsListComponent;
}());
AssetsListComponent = __decorate([
    core_1.Component({
        selector: 'app-assets-list',
        templateUrl: './assets-list.component.html',
        styleUrls: ['./assets-list.component.scss']
    })
], AssetsListComponent);
exports.AssetsListComponent = AssetsListComponent;
