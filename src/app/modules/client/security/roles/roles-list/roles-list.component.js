"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular_datatables_directive_1 = require("../../../../../directives/datatable/angular-datatables.directive");
var RolesListComponent = (function () {
    function RolesListComponent(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.dtOptions = {};
        this.selectedRole = null;
        this.selectedRowId = null;
        this.eventsService.on('menu-toggle', function () {
            console.log('hole');
        });
    }
    RolesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var columns = [{
                title: 'Nombre',
                data: 'name'
            }, {
                title: 'Descripción',
                data: 'description'
            }];
        this.dtOptions = this.datatableService.init('client/role/datatable', columns);
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
                    self.selectedRole = null;
                }
                else {
                    $('td.row-selected').removeClass('row-selected');
                    $('td', nRow).addClass('row-selected');
                    self.rowClicked(aData);
                }
            });
        };
    };
    RolesListComponent.prototype.rowClicked = function (data) {
        this.selectedRole = data;
    };
    RolesListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/roles/create']);
    };
    RolesListComponent.prototype.edit = function () {
        this.router.navigate(['/client/security/roles/' + this.selectedRole.id]);
    };
    RolesListComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/role', this.selectedRole.id).subscribe(function (response) {
            _this.toastr.success('Rol Eliminado con Exito');
            _this.selectedRole = null;
            _this.datatableEl.dtInstance.then(function (dtInstance) {
                dtInstance.ajax.reload();
            });
        });
    };
    RolesListComponent.prototype.ngOnDestroy = function () {
        this.eventsService.off('menu-toggle');
    };
    __decorate([
        core_1.ViewChild(angular_datatables_directive_1.DataTableDirective)
    ], RolesListComponent.prototype, "datatableEl", void 0);
    RolesListComponent = __decorate([
        core_1.Component({
            selector: 'app-roles-list',
            templateUrl: './roles-list.component.html',
            styleUrls: ['./roles-list.component.scss']
        })
    ], RolesListComponent);
    return RolesListComponent;
}());
exports.RolesListComponent = RolesListComponent;
