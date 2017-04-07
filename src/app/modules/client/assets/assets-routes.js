"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_component_1 = require("../index/index.component");
var auth_guard_service_1 = require("../../auth/guards/auth-guard.service");
var client_guard_1 = require("../../auth/guards/client.guard");
var assets_index_component_1 = require("./assets-index.component");
var permission_guard_1 = require("../../auth/guards/permission.guard");
var assets_list_component_1 = require("./assets-list/assets-list.component");
var manage_assets_component_1 = require("./manage-assets/manage-assets.component");
var asset_details_component_1 = require("./asset-details/asset-details.component");
exports.routes = [
    {
        path: 'client',
        component: index_component_1.IndexComponent,
        canActivate: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard],
        children: [
            {
                path: 'assets',
                component: assets_index_component_1.AssetsIndexComponent,
                canActivateChild: [auth_guard_service_1.AuthGuard, client_guard_1.ClientGuard, permission_guard_1.PermissionGuard],
                children: [
                    {
                        path: '',
                        component: assets_list_component_1.AssetsListComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.list'
                        }
                    },
                    {
                        path: 'create',
                        component: manage_assets_component_1.ManageAssetsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.store'
                        }
                    },
                    {
                        path: ':id',
                        component: manage_assets_component_1.ManageAssetsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.update'
                        }
                    },
                    {
                        path: ':id/info',
                        component: asset_details_component_1.AssetDetailsComponent,
                        data: {
                            redirectTo: 'client/dashboard',
                            permission: 'client-assets.show'
                        }
                    },
                ]
            },
        ]
    }
];
