var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../../../../services/api.service";
import { ToastsManager } from "ng2-toastr";
import { Router, ActivatedRoute } from "@angular/router";
var AdminManageRoleComponent = (function () {
    function AdminManageRoleComponent(formBuilder, apiService, toastr, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Rol';
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/admin/dashboard',
                active: false
            },
            {
                title: 'Securidad',
                link: '/admin/dashboard',
                active: false
            },
            {
                title: 'Roles',
                link: '/admin/security/roles',
                active: false
            },
            {
                title: 'Crear',
                link: '/admin/security/roles/create',
                active: true
            }
        ];
        this.roleForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            listAll: [true],
            showAll: [true],
            storeAll: [true],
            updateAll: [true],
            destroyAll: [true],
            permissions: this.formBuilder.array([]),
        });
        this.roleForm.controls['listAll'].valueChanges.subscribe(function (value) {
            _this.checkAll('list', value);
        });
        this.roleForm.controls['storeAll'].valueChanges.subscribe(function (value) {
            _this.checkAll('store', value);
        });
        this.roleForm.controls['showAll'].valueChanges.subscribe(function (value) {
            _this.checkAll('show', value);
        });
        this.roleForm.controls['updateAll'].valueChanges.subscribe(function (value) {
            _this.checkAll('update', value);
        });
        this.roleForm.controls['destroyAll'].valueChanges.subscribe(function (value) {
            _this.checkAll('destroy', value);
        });
    }
    AdminManageRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Rol';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/admin/security/roles/' + params['id'];
                _this.roleId = params['id'];
                _this.loading = true;
                _this.apiService.one('admin/roles', params['id'], 'permissions').subscribe(function (role) {
                    _this.apiService.all('admin/permissions').subscribe(function (response) {
                        _this.configurePermissions(response);
                        role.data.permissions = response.map(function (value, index) {
                            for (var i = 0; i < role.data.permissions.length; i++) {
                                if (role.data.permissions[i].slug === value.abilitiesList.slug) {
                                    return role.data.permissions[i];
                                }
                            }
                            return value.abilitiesList;
                        });
                        _this.loading = false;
                        _this.initForm(role.data);
                    }, function (error) {
                        _this.loading = false;
                    });
                }, function (error) {
                    _this.loading = false;
                });
            }
            else {
                _this.apiService.all('admin/permissions').subscribe(function (response) {
                    _this.configurePermissions(response);
                });
            }
        });
    };
    AdminManageRoleComponent.prototype.initForm = function (role) {
        role.listAll = true;
        role.storeAll = true;
        role.showAll = true;
        role.updateAll = true;
        role.destroyAll = true;
        if (role.permissions.length) {
            role.listAll = role.permissions.reduce(function (prev, current) {
                var previousValue = prev;
                if (prev.hasOwnProperty('list')) {
                    previousValue = prev.list;
                }
                return previousValue && current.list;
            });
            role.storeAll = role.permissions.reduce(function (prev, current) {
                var previousValue = prev;
                if (prev.hasOwnProperty('store')) {
                    previousValue = prev.store;
                }
                return previousValue && current.store;
            });
            role.showAll = role.permissions.reduce(function (prev, current) {
                var previousValue = prev;
                if (prev.hasOwnProperty('show')) {
                    previousValue = prev.show;
                }
                return previousValue && current.show;
            });
            role.updateAll = role.permissions.reduce(function (prev, current) {
                var previousValue = prev;
                if (prev.hasOwnProperty('update')) {
                    previousValue = prev.update;
                }
                return previousValue && current.update;
            });
            role.destroyAll = role.permissions.reduce(function (prev, current) {
                var previousValue = prev;
                if (prev.hasOwnProperty('destroy')) {
                    previousValue = prev.destroy;
                }
                return previousValue && current.destroy;
            });
        }
        else {
            role.permissions = this.permissions.value;
        }
        this.roleForm.reset(role);
    };
    Object.defineProperty(AdminManageRoleComponent.prototype, "permissions", {
        get: function () {
            return this.roleForm.get('permissions');
        },
        enumerable: true,
        configurable: true
    });
    ;
    AdminManageRoleComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.roleForm.value;
        this.saving = true;
        if (this.roleId) {
            this.apiService.update('admin/roles', this.roleId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Rol actualizado con exito');
                _this.router.navigate(['/admin/security/roles']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('admin/roles', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Rol creado con exito');
                _this.router.navigate(['/admin/security/roles']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    AdminManageRoleComponent.prototype.cancel = function () {
        this.router.navigate(['/admin/security/roles']);
    };
    AdminManageRoleComponent.prototype.checkAll = function (type, value) {
        var perm = this.permissions.value;
        perm.map(function (permission) {
            return permission[type] = value;
        });
        this.permissions.setValue(perm);
    };
    AdminManageRoleComponent.prototype.configurePermissions = function (response) {
        var _this = this;
        this.basePermissions = response;
        var permissionsFGs = this.basePermissions.map(function (permission) {
            var perm = permission.abilitiesList;
            perm.name = permission.name;
            perm.slug = permission.slug;
            return _this.formBuilder.group(perm);
        });
        var permissionsFormArray = this.formBuilder.array(permissionsFGs);
        this.roleForm.setControl('permissions', permissionsFormArray);
    };
    return AdminManageRoleComponent;
}());
AdminManageRoleComponent = __decorate([
    Component({
        selector: 'app-admin-manage-role',
        templateUrl: './admin-manage-role.component.html',
        styleUrls: ['./admin-manage-role.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService,
        ToastsManager, Router, ActivatedRoute])
], AdminManageRoleComponent);
export { AdminManageRoleComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/security/roles/manage-role/admin-manage-role.component.js.map