"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular_datatables_directive_1 = require("../../../../../directives/datatable/angular-datatables.directive");
var WorkersListComponent = (function () {
    function WorkersListComponent(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.dtOptions = {};
        this.selectedWorker = null;
        this.selectedRowId = null;
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
        this.eventsService.on('menu-toggle', function () {
            console.log('hole');
        });
    }
    WorkersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var columns = [{
                title: 'Nombre',
                data: 'first_name'
            }, {
                title: 'Apellido',
                data: 'last_name'
            }, {
                title: 'Rut/Pasaporte',
                data: 'rut_passport'
            }, {
                title: 'Cargo',
                data: 'position'
            }];
        this.dtOptions = this.datatableService.init('client/worker/datatable', columns);
        this.dtOptions.rowCallback = function (nRow, aData) {
            var self = _this;
            if (aData.id == self.selectedRowId) {
                $(nRow).children().addClass('row-selected');
            }
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                var id = aData.id;
                if (id === self.selectedRowId) {
                    self.selectedRowId = null;
                }
                else {
                    self.selectedRowId = id;
                }
                if ($('td', nRow).hasClass('row-selected')) {
                    $('td', nRow).removeClass('row-selected');
                    self.selectedWorker = null;
                }
                else {
                    $('td.row-selected').removeClass('row-selected');
                    $('td', nRow).addClass('row-selected');
                    self.rowClicked(aData);
                }
            });
        };
    };
    WorkersListComponent.prototype.rowClicked = function (data) {
        this.selectedWorker = data;
    };
    WorkersListComponent.prototype.create = function () {
        this.router.navigate(['/client/rrhh/workers/create']);
    };
    WorkersListComponent.prototype.edit = function () {
        this.router.navigate(['/client/rrhh/workers/' + this.selectedWorker.id]);
    };
    WorkersListComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/worker', this.selectedWorker.id).subscribe(function (response) {
            _this.toastr.success('Trabajador Eliminado con Exito');
            _this.selectedWorker = null;
            _this.datatableEl.dtInstance.then(function (dtInstance) {
                dtInstance.ajax.reload();
            });
        }, function (error) {
            _this.toastr.error(error);
        });
    };
    WorkersListComponent.prototype.ngOnDestroy = function () {
        this.eventsService.off('menu-toggle');
    };
    __decorate([
        core_1.ViewChild(angular_datatables_directive_1.DataTableDirective)
    ], WorkersListComponent.prototype, "datatableEl", void 0);
    WorkersListComponent = __decorate([
        core_1.Component({
            selector: 'app-workers-list',
            templateUrl: 'workers-list.component.html',
            styleUrls: ['workers-list.component.scss']
        })
    ], WorkersListComponent);
    return WorkersListComponent;
}());
exports.WorkersListComponent = WorkersListComponent;
