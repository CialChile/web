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
import { STATUSCOLUMNS } from "./statusColumns";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { ApiService } from "../../../../../services/api.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
var StatusListComponent = (function () {
    function StatusListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.tableView = true;
        this.statusesColumns = STATUSCOLUMNS;
        this.columns = [];
        this.STATUS_TYPES = [
            { value: 0, label: 'Activo' },
            { value: 1, label: 'Documento' }
        ];
    }
    StatusListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.statusesColumns.length; i++) {
            this.columns.push(this.statusesColumns[i]);
            this.columnOptions.push({ label: this.statusesColumns[i].name, value: this.statusesColumns[i] });
        }
    };
    StatusListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    StatusListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.statusesColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.statusesColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.statusesColumns.length; i++) {
            _loop_1(i);
        }
    };
    StatusListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/config/status/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.statuses = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    StatusListComponent.prototype.getStatusTypeLabel = function (statusType) {
        return this.STATUS_TYPES[statusType].label;
    };
    ;
    StatusListComponent.prototype.create = function () {
        this.router.navigate(['/client/configuration/status/create']);
    };
    StatusListComponent.prototype.edit = function (status) {
        this.router.navigate(['/client/configuration/status/' + status.id]);
    };
    StatusListComponent.prototype.remove = function (status) {
        var _this = this;
        this.apiService.destroy('client/config/status', status.id).subscribe(function (response) {
            _this.toastr.success('Status Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return StatusListComponent;
}());
StatusListComponent = __decorate([
    Component({
        selector: 'app-status-list',
        templateUrl: './status-list.component.html',
        styleUrls: ['./status-list.component.scss']
    }),
    __metadata("design:paramtypes", [DatatableService, ApiService,
        Router, ToastsManager])
], StatusListComponent);
export { StatusListComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/status/status-list/status-list.component.js.map