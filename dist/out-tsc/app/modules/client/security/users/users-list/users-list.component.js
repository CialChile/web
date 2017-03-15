var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from "../../../../../directives/datatable/angular-datatables.directive";
import { DatatableService } from "../../../../../services/datatable/datatable.service";
import { ApiService } from "../../../../../services/api.service";
import { EventsService } from "../../../../../services/events/events.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
export let UsersListComponent = class UsersListComponent {
    constructor(datatableService, apiService, eventsService, router, toastr) {
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
        this.eventsService.on('menu-toggle', () => {
            console.log('hole');
        });
    }
    ngOnInit() {
        const columns = [{
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
        this.dtOptions.rowCallback = (nRow, aData) => {
            let self = this;
            if (aData.id == self.selectedUserId) {
                $(nRow).children().addClass('row-selected');
            }
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', () => {
                let id = aData.id;
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
    }
    rowClicked(data) {
        this.selectedUser = data;
    }
    create() {
        this.router.navigate(['/client/security/users/create']);
    }
    edit() {
        this.router.navigate(['/client/security/users/' + this.selectedUser.id]);
    }
    remove() {
        this.apiService.destroy('client/secure-user', this.selectedUser.id).subscribe((response) => {
            this.toastr.success('Usuario Eliminado con Exito');
            this.selectedUser = null;
            this.datatableEl.dtInstance.then((dtInstance) => {
                dtInstance.ajax.reload();
            });
        });
    }
    ngOnDestroy() {
        this.eventsService.off('menu-toggle');
    }
};
__decorate([
    ViewChild(DataTableDirective), 
    __metadata('design:type', DataTableDirective)
], UsersListComponent.prototype, "datatableEl", void 0);
UsersListComponent = __decorate([
    Component({
        selector: 'app-users-list',
        templateUrl: './users-list.component.html',
        styleUrls: ['./users-list.component.scss']
    }), 
    __metadata('design:paramtypes', [DatatableService, ApiService, EventsService, Router, ToastsManager])
], UsersListComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/users/users-list/users-list.component.js.map