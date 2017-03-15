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
import { EventsService } from "../../../../../services/events/events.service";
import { Router } from "@angular/router";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
export let RolesListComponent = class RolesListComponent {
    constructor(datatableService, apiService, eventsService, router, toastr) {
        this.datatableService = datatableService;
        this.apiService = apiService;
        this.eventsService = eventsService;
        this.router = router;
        this.toastr = toastr;
        this.dtOptions = {};
        this.selectedRole = null;
        this.selectedRowId = null;
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
                title: 'Roles',
                link: '/client/security/roles',
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
                data: 'name'
            }, {
                title: 'Descripción',
                data: 'description'
            }];
        this.dtOptions = this.datatableService.init('client/role/datatable', columns);
        this.dtOptions.rowCallback = (nRow, aData) => {
            let self = this;
            if (aData.id == self.selectedRowId) {
                $(nRow).children().addClass('row-selected');
            }
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', () => {
                let id = aData.id;
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
    }
    rowClicked(data) {
        this.selectedRole = data;
    }
    create() {
        this.router.navigate(['/client/security/roles/create']);
    }
    edit() {
        this.router.navigate(['/client/security/roles/' + this.selectedRole.id]);
    }
    remove() {
        this.apiService.destroy('client/role', this.selectedRole.id).subscribe((response) => {
            this.toastr.success('Rol Eliminado con Exito');
            this.selectedRole = null;
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
], RolesListComponent.prototype, "datatableEl", void 0);
RolesListComponent = __decorate([
    Component({
        selector: 'app-roles-list',
        templateUrl: './roles-list.component.html',
        styleUrls: ['./roles-list.component.scss']
    }), 
    __metadata('design:paramtypes', [DatatableService, ApiService, EventsService, Router, ToastsManager])
], RolesListComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/roles/roles-list/roles-list.component.js.map