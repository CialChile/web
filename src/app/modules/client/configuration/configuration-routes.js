"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var permission_guard_1 = require("../../auth/guards/permission.guard");
var configuration_index_component_1 = require("./configuration-index.component");
var brands_list_component_1 = require("./brands/brands-list/brands-list.component");
var manage_brands_component_1 = require("./brands/manage-brands/manage-brands.component");
var brand_models_list_component_1 = require("./brands/brand-models-list/brand-models-list.component");
var manage_brand_models_component_1 = require("./brands/manage-brand-models/manage-brand-models.component");
var categories_list_component_1 = require("./categories/categories-list/categories-list.component");
var manage_categories_component_1 = require("./categories/manage-categories/manage-categories.component");
var subcategories_list_component_1 = require("./categories/subcategories-list/subcategories-list.component");
var manage_subcategories_component_1 = require("./categories/manage-subcategories/manage-subcategories.component");
var workplaces_list_component_1 = require("./workplaces/workplaces-list/workplaces-list.component");
var manage_workplaces_component_1 = require("./workplaces/manage-workplaces/manage-workplaces.component");
var asset_config_component_1 = require("./assets/asset-config/asset-config.component");
var status_list_component_1 = require("./status/status-list/status-list.component");
var manage_status_component_1 = require("./status/manage-status/manage-status.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'configuration',
                component: configuration_index_component_1.ConfigurationIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
                children: [
                    {
                        path: 'brands',
                        component: brands_list_component_1.BrandsListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.list'
                        },
                    },
                    {
                        path: 'brands/create',
                        component: manage_brands_component_1.ManageBrandsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.store'
                        }
                    },
                    {
                        path: 'brands/brand-models',
                        component: brand_models_list_component_1.BrandModelsListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.list'
                        }
                    },
                    {
                        path: 'brands/brand-models/create',
                        component: manage_brand_models_component_1.ManageBrandModelsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.store'
                        }
                    },
                    {
                        path: 'brands/:id/brand-models/:brandModelId',
                        component: manage_brand_models_component_1.ManageBrandModelsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brand-models.store'
                        }
                    },
                    {
                        path: 'brands/:id',
                        component: manage_brands_component_1.ManageBrandsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-brands.show'
                        }
                    },
                    {
                        path: 'categories',
                        component: categories_list_component_1.CategoriesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.list'
                        },
                    },
                    {
                        path: 'categories/create',
                        component: manage_categories_component_1.ManageCategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.store'
                        }
                    },
                    {
                        path: 'categories/subcategories',
                        component: subcategories_list_component_1.SubcategoriesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.list'
                        }
                    },
                    {
                        path: 'categories/subcategories/create',
                        component: manage_subcategories_component_1.ManageSubcategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.store'
                        }
                    },
                    {
                        path: 'categories/:id/subcategories/:subcategoryId',
                        component: manage_subcategories_component_1.ManageSubcategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-subcategories.show'
                        }
                    },
                    {
                        path: 'categories/:id',
                        component: manage_categories_component_1.ManageCategoriesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-categories.show'
                        }
                    },
                    {
                        path: 'workplaces',
                        component: workplaces_list_component_1.WorkplacesListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.list'
                        },
                    },
                    {
                        path: 'workplaces/create',
                        component: manage_workplaces_component_1.ManageWorkplacesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.store'
                        }
                    },
                    {
                        path: 'workplaces/:id',
                        component: manage_workplaces_component_1.ManageWorkplacesComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-assets-workplaces.show'
                        }
                    },
                    {
                        path: 'assets',
                        component: asset_config_component_1.AssetConfigComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.show'
                        },
                    },
                    {
                        path: 'status',
                        component: status_list_component_1.StatusListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.list'
                        },
                    },
                    {
                        path: 'status/create',
                        component: manage_status_component_1.ManageStatusComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.store'
                        }
                    },
                    {
                        path: 'status/:id',
                        component: manage_status_component_1.ManageStatusComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-config-status.show'
                        }
                    },
                ]
            }
        ]
    }
];
