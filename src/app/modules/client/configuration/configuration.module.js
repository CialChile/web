"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var configuration_index_component_1 = require("./configuration-index.component");
var brands_list_component_1 = require("./brands/brands-list/brands-list.component");
var manage_brands_component_1 = require("./brands/manage-brands/manage-brands.component");
var manage_brand_models_component_1 = require("./brands/manage-brand-models/manage-brand-models.component");
var brand_models_list_component_1 = require("./brands/brand-models-list/brand-models-list.component");
var manage_categories_component_1 = require("./categories/manage-categories/manage-categories.component");
var categories_list_component_1 = require("./categories/categories-list/categories-list.component");
var subcategories_list_component_1 = require("./categories/subcategories-list/subcategories-list.component");
var manage_subcategories_component_1 = require("./categories/manage-subcategories/manage-subcategories.component");
var manage_workplaces_component_1 = require("./workplaces/manage-workplaces/manage-workplaces.component");
var workplaces_list_component_1 = require("./workplaces/workplaces-list/workplaces-list.component");
var layouts_module_1 = require("../../../components/layouts/layouts.module");
var datatable_1 = require("primeng/components/datatable/datatable");
var shared_1 = require("primeng/components/common/shared");
var button_1 = require("primeng/components/button/button");
var datagrid_1 = require("primeng/components/datagrid/datagrid");
var multiselect_1 = require("primeng/components/multiselect/multiselect");
var togglebutton_1 = require("primeng/components/togglebutton/togglebutton");
var forms_1 = require("@angular/forms");
var forms_helpers_module_1 = require("../../../components/forms/forms-helpers.module");
var dropdown_1 = require("primeng/components/dropdown/dropdown");
var panel_1 = require("primeng/components/panel/panel");
var asset_config_component_1 = require("./assets/asset-config/asset-config.component");
var angular2_text_mask_1 = require("angular2-text-mask");
var status_list_component_1 = require("./status/status-list/status-list.component");
var manage_status_component_1 = require("./status/manage-status/manage-status.component");
var configuration_routing_module_1 = require("./configuration-routing.module");
var primeng_1 = require("primeng/primeng");
var ConfigurationModule = (function () {
    function ConfigurationModule() {
    }
    return ConfigurationModule;
}());
ConfigurationModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            layouts_module_1.LayoutsModule,
            datatable_1.DataTableModule,
            shared_1.SharedModule,
            button_1.ButtonModule,
            multiselect_1.MultiSelectModule,
            datagrid_1.DataGridModule,
            togglebutton_1.ToggleButtonModule,
            forms_1.ReactiveFormsModule,
            forms_helpers_module_1.FormsHelperModule,
            forms_1.FormsModule,
            dropdown_1.DropdownModule,
            panel_1.PanelModule,
            angular2_text_mask_1.TextMaskModule,
            configuration_routing_module_1.ConfigurationRoutingModule,
            primeng_1.GMapModule
        ],
        declarations: [configuration_index_component_1.ConfigurationIndexComponent, brands_list_component_1.BrandsListComponent, manage_brands_component_1.ManageBrandsComponent,
            manage_brand_models_component_1.ManageBrandModelsComponent, brand_models_list_component_1.BrandModelsListComponent, manage_categories_component_1.ManageCategoriesComponent,
            categories_list_component_1.CategoriesListComponent, subcategories_list_component_1.SubcategoriesListComponent, manage_subcategories_component_1.ManageSubcategoriesComponent,
            manage_workplaces_component_1.ManageWorkplacesComponent, workplaces_list_component_1.WorkplacesListComponent, asset_config_component_1.AssetConfigComponent, status_list_component_1.StatusListComponent, manage_status_component_1.ManageStatusComponent]
    })
], ConfigurationModule);
exports.ConfigurationModule = ConfigurationModule;
