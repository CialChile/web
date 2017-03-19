"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular_datatables_directive_1 = require("../../../../../directives/datatable/angular-datatables.directive");
var UsersListComponent = (function () {
    function UsersListComponent(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.dtOptions = {};
        this.selectedUser = null;
        this.selectedUserId = null;
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Seguridad',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Usuarios',
                link: '/client/security/users',
                active: true
            }
        ];
        this.eventsService.on('menu-toggle', function () {
            console.log('hole');
        });
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var columns = [{
                title: 'Nombre',
                data: 'first_name'
            }, {
                title: 'Apellido',
                data: 'last_name'
            }, {
                title: 'Correo Electrónico',
                data: 'email'
            }, {
                title: 'Rol',
                data: 'role.name',
                searchable: false,
                sortable: false
            }];
        this.dtOptions = this.datatableService.init('client/secure-user/datatable', columns, 'role');
        this.dtOptions.rowCallback = function (nRow, aData) {
            var self = _this;
            if (aData.id == self.selectedUserId) {
                $(nRow).children().addClass('row-selected');
            }
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                var id = aData.id;
                if (id === self.selectedUserId) {
                    self.selectedUserId = null;
                }
                else {
                    self.selectedUserId = id;
                }
                if ($('td', nRow).hasClass('row-selected')) {
                    $('td', nRow).removeClass('row-selected');
                    self.selectedUser = null;
                }
                else {
                    $('td.row-selected').removeClass('row-selected');
                    $('td', nRow).addClass('row-selected');
                    self.rowClicked(aData);
                }
            });
        };
    };
    UsersListComponent.prototype.rowClicked = function (data) {
        this.selectedUser = data;
    };
    UsersListComponent.prototype.create = function () {
        this.router.navigate(['/client/security/users/create']);
    };
    UsersListComponent.prototype.edit = function () {
        this.router.navigate(['/client/security/users/' + this.selectedUser.id]);
    };
    UsersListComponent.prototype.remove = function () {
        var _this = this;
        this.apiService.destroy('client/secure-user', this.selectedUser.id).subscribe(function (response) {
            _this.toastr.success('Usuario Eliminado con Exito');
            _this.selectedUser = null;
            _this.datatableEl.dtInstance.then(function (dtInstance) {
                dtInstance.ajax.reload();
            });
        });
    };
    UsersListComponent.prototype.ngOnDestroy = function () {
        this.eventsService.off('menu-toggle');
    };
    __decorate([
        core_1.ViewChild(angular_datatables_directive_1.DataTableDirective)
    ], UsersListComponent.prototype, "datatableEl", void 0);
    UsersListComponent = __decorate([
        core_1.Component({
            selector: 'app-users-list',
            templateUrl: './users-list.component.html',
            styleUrls: ['./users-list.component.scss']
        })
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;
