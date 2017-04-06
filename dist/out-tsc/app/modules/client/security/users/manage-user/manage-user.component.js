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
import { ValidationService } from "../../../../../components/forms/validation/validation.service";
var ManageUserComponent = (function () {
    function ManageUserComponent(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.loading = false;
        this.title = 'Nuevo Usuario';
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
                title: 'Usuarios',
                link: '/client/security/users',
                active: false
            },
            {
                title: 'Crear',
                link: '/client/security/users/create',
                active: true
            }
        ];
        this.userForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.compose([Validators.required, ValidationService.emailValidator])]],
            role: ['', [Validators.required]],
            active: [true],
        });
    }
    ManageUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.all('client/roles').subscribe(function (roles) {
            _this.roles = roles.data;
        });
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.title = 'Editar Usuario';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].title = 'Editar';
                _this.breadcrumbs[_this.breadcrumbs.length - 1].link = '/client/security/users/' + params['id'];
                _this.userId = params['id'];
                _this.loading = true;
                _this.apiService.one('client/secure-users', params['id'], 'role').subscribe(function (user) {
                    user.data.role = user.data.role.id;
                    _this.loading = false;
                    _this.initForm(user.data);
                }, function (error) {
                    _this.loading = false;
                });
            }
        });
    };
    ManageUserComponent.prototype.initForm = function (user) {
        this.userForm.reset(user);
    };
    ManageUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = this.userForm.value;
        this.saving = true;
        if (this.userId) {
            this.apiService.update('client/secure-users', this.userId, data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Usuario actualizado con exito');
                _this.router.navigate(['/client/security/users']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
        else {
            this.apiService.create('client/secure-users', data).subscribe(function (response) {
                _this.saving = false;
                _this.toastr.success('Usuario creado con exito');
                _this.router.navigate(['/client/security/users']);
            }, function (error) {
                _this.toastr.error(error);
                _this.saving = false;
            });
        }
    };
    ManageUserComponent.prototype.cancel = function () {
        this.router.navigate(['/client/security/users']);
    };
    return ManageUserComponent;
}());
ManageUserComponent = __decorate([
    Component({
        selector: 'app-manage-user',
        templateUrl: './manage-user.component.html',
        styleUrls: ['./manage-user.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, ApiService,
        ToastsManager, Router, ActivatedRoute])
], ManageUserComponent);
export { ManageUserComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/users/manage-user/manage-user.component.js.map