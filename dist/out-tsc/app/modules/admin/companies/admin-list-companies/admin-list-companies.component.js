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
import { DatatableService } from "../../../../services/datatable/datatable.service";
import { EventsService } from "../../../../services/events/events.service";
import { Router } from "@angular/router";
import { DataTableDirective } from "../../../../directives/datatable/angular-datatables.directive";
export let AdminListCompaniesComponent = class AdminListCompaniesComponent {
    constructor(datatableService, eventsService, router) {
        this.datatableService = datatableService;
        this.eventsService = eventsService;
        this.router = router;
        this.dtOptions = {};
        this.selectedCompany = null;
        this.selectedRowId = null;
        this.eventsService.on('menu-toggle', () => {
            console.log('hole');
        });
    }
    ngOnInit() {
        const columns = [{
                title: 'Nombre',
                data: 'name'
            }, {
                title: 'Nombre Comercial',
                data: 'commercial_name'
            }, {
                title: 'Identificación Fiscal',
                data: 'fiscal_identification'
            }, {
                title: 'Activo',
                data: 'active',
                render: (data, type, row) => {
                    console.log(data, row);
                    return row.active ? 'Si' : 'No';
                }
            }];
        this.dtOptions = this.datatableService.init('admin/company/datatable', columns);
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
                    self.selectedCompany = null;
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
        this.selectedCompany = data;
    }
    create() {
        this.router.navigate(['/admin/companies/create']);
    }
    edit() {
        this.router.navigate(['/admin/companies/' + this.selectedCompany.id]);
    }
    remove() {
    }
    ngOnDestroy() {
        this.eventsService.off('menu-toggle');
    }
};
__decorate([
    ViewChild(DataTableDirective), 
    __metadata('design:type', DataTableDirective)
], AdminListCompaniesComponent.prototype, "datatableEl", void 0);
AdminListCompaniesComponent = __decorate([
    Component({
        selector: 'admin-list-companies',
        templateUrl: 'admin-list-companies.component.html',
        styleUrls: ['admin-list-companies.component.scss']
    }), 
    __metadata('design:paramtypes', [DatatableService, EventsService, Router])
], AdminListCompaniesComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-list-companies/admin-list-companies.component.js.map