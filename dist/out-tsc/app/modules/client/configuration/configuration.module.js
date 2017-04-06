var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationIndexComponent } from "./configuration-index.component";
import { BrandsListComponent } from './brands/brands-list/brands-list.component';
import { ManageBrandsComponent } from './brands/manage-brands/manage-brands.component';
import { ManageBrandModelsComponent } from "./brands/manage-brand-models/manage-brand-models.component";
import { BrandModelsListComponent } from "./brands/brand-models-list/brand-models-list.component";
import { ManageCategoriesComponent } from './categories/manage-categories/manage-categories.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { SubcategoriesListComponent } from './categories/subcategories-list/subcategories-list.component';
import { ManageSubcategoriesComponent } from './categories/manage-subcategories/manage-subcategories.component';
import { ManageWorkplacesComponent } from './workplaces/manage-workplaces/manage-workplaces.component';
import { WorkplacesListComponent } from './workplaces/workplaces-list/workplaces-list.component';
import { LayoutsModule } from "../../../components/layouts/layouts.module";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { DataGridModule } from "primeng/components/datagrid/datagrid";
import { MultiSelectModule } from "primeng/components/multiselect/multiselect";
import { ToggleButtonModule } from "primeng/components/togglebutton/togglebutton";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormsHelperModule } from "../../../components/forms/forms-helpers.module";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { PanelModule } from "primeng/components/panel/panel";
import { AssetConfigComponent } from './assets/asset-config/asset-config.component';
import { TextMaskModule } from 'angular2-text-mask';
import { StatusListComponent } from './status/status-list/status-list.component';
import { ManageStatusComponent } from './status/manage-status/manage-status.component';
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { GMapModule } from 'primeng/primeng';
var ConfigurationModule = (function () {
    function ConfigurationModule() {
    }
    return ConfigurationModule;
}());
ConfigurationModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            LayoutsModule,
            DataTableModule,
            SharedModule,
            ButtonModule,
            MultiSelectModule,
            DataGridModule,
            ToggleButtonModule,
            ReactiveFormsModule,
            FormsHelperModule,
            FormsModule,
            DropdownModule,
            PanelModule,
            TextMaskModule,
            ConfigurationRoutingModule,
            GMapModule
        ],
        declarations: [ConfigurationIndexComponent, BrandsListComponent, ManageBrandsComponent,
            ManageBrandModelsComponent, BrandModelsListComponent, ManageCategoriesComponent,
            CategoriesListComponent, SubcategoriesListComponent, ManageSubcategoriesComponent,
            ManageWorkplacesComponent, WorkplacesListComponent, AssetConfigComponent, StatusListComponent, ManageStatusComponent]
    })
], ConfigurationModule);
export { ConfigurationModule };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/configuration.module.js.map