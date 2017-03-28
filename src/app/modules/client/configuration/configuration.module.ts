import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationIndexComponent} from "./configuration-index.component";
import {BrandsListComponent} from './brands/brands-list/brands-list.component';
import {ManageBrandsComponent} from './brands/manage-brands/manage-brands.component';
import {ManageBrandModelsComponent} from "./brands/manage-brand-models/manage-brand-models.component";
import {BrandModelsListComponent} from "./brands/brand-models-list/brand-models-list.component";
import {ManageCategoriesComponent} from './categories/manage-categories/manage-categories.component';
import {CategoriesListComponent} from './categories/categories-list/categories-list.component';
import {SubcategoriesListComponent} from './categories/subcategories-list/subcategories-list.component';
import {ManageSubcategoriesComponent} from './categories/manage-subcategories/manage-subcategories.component';
import {ManageWorkplacesComponent} from './workplaces/manage-workplaces/manage-workplaces.component';
import {WorkplacesListComponent} from './workplaces/workplaces-list/workplaces-list.component';
import {LayoutsModule} from "../../../components/layouts/layouts.module";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {DataGridModule} from "primeng/components/datagrid/datagrid";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {ToggleButtonModule} from "primeng/components/togglebutton/togglebutton";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {FormsHelperModule} from "../../../components/forms/forms-helpers.module";
import {RouterModule} from "@angular/router";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {PanelModule} from "primeng/components/panel/panel";
import {AssetConfigComponent} from './assets/asset-config/asset-config.component';
import { TextMaskModule } from 'angular2-text-mask';
import { StatusListComponent } from './status/status-list/status-list.component';
import { ManageStatusComponent } from './status/manage-status/manage-status.component';

@NgModule({
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
    RouterModule,
    DropdownModule,
    PanelModule,
    TextMaskModule
  ],
  declarations: [ConfigurationIndexComponent, BrandsListComponent, ManageBrandsComponent,
    ManageBrandModelsComponent, BrandModelsListComponent, ManageCategoriesComponent,
    CategoriesListComponent, SubcategoriesListComponent, ManageSubcategoriesComponent,
    ManageWorkplacesComponent, WorkplacesListComponent, AssetConfigComponent, StatusListComponent, ManageStatusComponent]
})
export class ConfigurationModule {
}
