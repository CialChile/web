"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var workersColumns_1 = require("./workersColumns");
var WorkersListComponent = (function () {
    function WorkersListComponent(datatableService, apiService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.router = router;
        this.toastr = toastr;
        this.pageLength = 10;
        this.defaultImage = 'assets/img/missing.png';
        this.tableView = true;
        this.workersColumns = workersColumns_1.WORKERSCOLUMNS;
        this.columns = [];
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'RRHH',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Trabajadores',
                link: '/client/rrhh/workers',
                active: true
            }
        ];
    }
    WorkersListComponent.prototype.ngOnInit = function () {
        this.columnOptions = [];
        for (var i = 0; i < this.workersColumns.length; i++) {
            if (i < 4) {
                this.columns.push(this.workersColumns[i]);
            }
            this.columnOptions.push({ label: this.workersColumns[i].name, value: this.workersColumns[i] });
        }
    };
    WorkersListComponent.prototype.searchGlobally = function () {
        this.lastLoadEvent.globalFilter = this.globalSearch;
        this.reloadTable(this.lastLoadEvent);
    };
    WorkersListComponent.prototype.reloadTable = function (event) {
        var _this = this;
        this.lastLoadEvent = event;
        this.datatableService.getData(event, this.columns, 'client/workers/datatable', '', this.globalSearch)
            .toPromise().then(function (response) {
            _this.workers = response.data;
            _this.totalRecords = response.recordsFiltered;
        });
    };
    WorkersListComponent.prototype.columnsChange = function (event) {
        var _this = this;
        this.columns = [];
        var _loop_1 = function (i) {
            var columnSelected = event.value.filter(function (selectedColumn) {
                return selectedColumn.data == _this.workersColumns[i].data;
            });
            if (columnSelected.length) {
                this_1.columns.push(this_1.workersColumns[i]);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.workersColumns.length; i++) {
            _loop_1(i);
        }
    };
    WorkersListComponent.prototype.showDetail = function (worker) {
        this.router.navigate(['/client/rrhh/workers/' + worker.id + '/info']);
    };
    WorkersListComponent.prototype.create = function () {
        this.router.navigate(['/client/rrhh/workers/create']);
    };
    WorkersListComponent.prototype.edit = function (worker) {
        this.router.navigate(['/client/rrhh/workers/' + worker.id]);
    };
    WorkersListComponent.prototype.remove = function (worker) {
        var _this = this;
        this.apiService.destroy('client/workers', worker.id).subscribe(function (response) {
            _this.toastr.success('Trabajador Eliminado con Exito');
            _this.reloadTable(_this.lastLoadEvent);
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    return WorkersListComponent;
}());
WorkersListComponent = __decorate([
    core_1.Component({
        selector: 'app-workers-list',
        templateUrl: 'workers-list.component.html',
        styleUrls: ['workers-list.component.scss']
    })
], WorkersListComponent);
exports.WorkersListComponent = WorkersListComponent;
