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
export let ManageUserComponent = class ManageUserComponent {
    constructor(formBuilder, apiService, toastr, router, route) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.toastr = toastr;
        this.router = router;
        this.route = route;
        this.saving = false;
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
    ngOnInit() {
        this.apiService.all('client/role').subscribe((roles) => {
            this.roles = roles.data;
        });
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.title = 'Editar Usuario';
                this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
                this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/security/users/' + params['id'];
                this.userId = params['id'];
                this.apiService.one('client/secure-user', params['id'], 'role').subscribe((user) => {
                    user.data.role = user.data.role.id;
                    this.initForm(user.data);
                });
            }
        });
    }
    initForm(user) {
        this.userForm.reset(user);
    }
    onSubmit() {
        let data = this.userForm.value;
        this.saving = true;
        if (this.userId) {
            this.apiService.update('client/secure-user', this.userId, data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Usuario actualizado con exito');
                this.router.navigate(['/client/security/users']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
        else {
            this.apiService.create('client/secure-user', data).subscribe((response) => {
                this.saving = false;
                this.toastr.success('Usuario creado con exito');
                this.router.navigate(['/client/security/users']);
            }, (error) => {
                this.toastr.error(error);
                this.saving = false;
            });
        }
    }
    cancel() {
        this.router.navigate(['/client/security/users']);
    }
};
ManageUserComponent = __decorate([
    Component({
        selector: 'app-manage-user',
        templateUrl: './manage-user.component.html',
        styleUrls: ['./manage-user.component.scss']
    }), 
    __metadata('design:paramtypes', [FormBuilder, ApiService, ToastsManager, Router, ActivatedRoute])
], ManageUserComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/security/users/manage-user/manage-user.component.js.map