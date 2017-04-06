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
import { WORKPLACECOLUMNS } from "./workplacesColumns";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { ApiService } from "../../../../../services/api.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
var WorkplacesListComponent = (function () {
    function WorkplacesListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.workplacesColumns = WORKPLACECOLUMNS;
        this.columns = [];
    }
    WorkplacesListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.workplacesColumns.length; i++) {
            this.columns.push(this.workplacesColumns[i]);
            this.columnOptions.push({ label: this.workplacesColumns[i].name, value: this.workplacesColumns[i] });
        }
    };
    WorkplacesListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    WorkplacesListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/assets/config/workplaces/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.workplaces = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    WorkplacesListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.workplacesColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.workplacesColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.workplacesColumns.length; i++) {
            _loop_1(i);
        }
    };
    WorkplacesListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/workplaces/create']);
    };
    WorkplacesListComponent.prototype.edit = function (asset) {
        this.router.navigate(['/client/configuration/workplaces/' + asset.id]);
    };
    WorkplacesListComponent.prototype.remove = function (asset) {
        var _this = this;
        this.apiService.destroy('client/assets/config/workplaces', asset.id).subscribe(function (response) {
            _this.toastr.success('Lugar de Trabajo Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return WorkplacesListComponent;
}());
WorkplacesListComponent = __decorate([
    Component({
        selector: 'app-workplaces-list',
        templateUrl: './workplaces-list.component.html',
        styleUrls: ['./workplaces-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], WorkplacesListComponent);
export { WorkplacesListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/workplaces/workplaces-list/workplaces-list.component.js.map