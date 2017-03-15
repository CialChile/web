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
export let ManageRoleComponent = class ManageRoleComponent {
    constructor(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.title = 'Nuevo Rol';
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Securidad',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Roles',
                link: '/client/security/roles',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/security/roles/create',
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
        this.roleForm.controls['listAll'].valueChanges.subscribe((value) => {
            this.checkAll('list', value);
        });
        this.roleForm.controls['storeAll'].valueChanges.subscribe((value) => {
            this.checkAll('store', value);
        });
        this.roleForm.controls['showAll'].valueChanges.subscribe((value) => {
            this.checkAll('show', value);
        });
        this.roleForm.controls['updateAll'].valueChanges.subscribe((value) => {
            this.checkAll('update', value);
        });
        this.roleForm.controls['destroyAll'].valueChanges.subscribe((value) => {
            this.checkAll('destroy', value);
        });
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.title = 'Editar Rol';
                this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
                this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/security/roles/' + params['id'];
                this.roleId = params['id'];
                this.apiService.one('client/role', params['id'], 'permissions').subscribe((role) => {
                    this.apiService.all('client/permission').subscribe((response) => {
                        this.configurePermissions(response);
                        this.initForm(role.data);
                    });
                });
            }
            else {
                this.apiService.all('client/permission').subscribe((response) => {
                    this.configurePermissions(response);
                });
            }
        });
    }
    initForm(role) {
        role.listAll = true;
        role.storeAll = true;
        role.showAll = true;
        role.updateAll = true;
        role.destroyAll = true;
        if (role.permissions.length) {
            role.listAll = role.permissions.reduce(function (prev, current) {
                let previousValue = prev;
                if (prev.hasOwnProperty('list')) {
                    previousValue = prev.list;
                }
                return previousValue && current.list;
            });
            role.storeAll = role.permissions.reduce(function (prev, current) {
                let previousValue = prev;
                if (prev.hasOwnProperty('store')) {
                    previousValue = prev.store;
                }
                return previousValue && current.store;
            });
            role.showAll = role.permissions.reduce(function (prev, current) {
                let previousValue = prev;
                if (prev.hasOwnProperty('show')) {
                    previousValue = prev.show;
                }
                return previousValue && current.show;
            });
            role.updateAll = role.permissions.reduce(function (prev, current) {
                let previousValue = prev;
                if (prev.hasOwnProperty('update')) {
                    previousValue = prev.update;
                }
                return previousValue && current.update;
            });
            role.destroyAll = role.permissions.reduce(function (prev, current) {
                let previousValue = prev;
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
    }
    get permissions() {
        return this.roleForm.get('permissions');
    }
    ;
    onSubmit() {
        let data = this.roleForm.value;
        this.saving = true;
        if (this.roleId) {
            this.apiService.update('client/role', this.roleId, data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Rol actualizado con exito');
                this.router.navigate(['/client/security/roles']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
        else {
            this.apiService.create('client/role', data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Rol creado con exito');
                this.router.navigate(['/client/security/roles']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
    }
    cancel() {
        this.router.navigate(['/client/security/roles']);
    }
    checkAll(type, value) {
        let perm = this.permissions.value;
        perm.map((permission) => {
            return permission[type] = value;
        });
        this.permissions.setValue(perm);
    }
    configurePermissions(response) {
        this.basePermissions = response;
        const permissionsFGs = this.basePermissions.map((permission) => {
            let perm = permission.abilitiesList;
            perm.name = permission.name;
            perm.slug = permission.slug;
            return this.formBuilder.group(perm);
        });
        const permissionsFormArray = this.formBuilder.array(permissionsFGs);
        this.roleForm.setControl('permissions', permissionsFormArray);
    }
};
ManageRoleComponent = __decorate([
    Component({
        selector: 'app-manage-role',
        templateUrl: './manage-role.component.html',
        styleUrls: ['./manage-role.component.scss']
    }), 
    __metadata('design:paramtypes', [FormBuilder, ApiService, ToastsManager, Router, ActivatedRoute])
], ManageRoleComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/roles/manage-role/manage-role.component.js.map