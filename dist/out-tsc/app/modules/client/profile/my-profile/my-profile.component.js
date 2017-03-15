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
import { ToastsManager } from "ng2-toastr";
import { ApiService } from "../../../../services/api.service";
import { ValidationService } from "../../../../components/forms/validation/validation.service";
import { UserService } from "../../../auth/services/user.service";
export let MyProfileComponent = class MyProfileComponent {
    constructor(formBuilder, userService, toastr, apiService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.toastr = toastr;
        this.apiService = apiService;
        this.breadcrumbs = [
            {
                title: 'Home',
                link: '/client/dashboard',
                active: false
            },
            {
                title: 'Mi Perfil',
                link: '/client/my-profile',
                active: true
            }
        ];
        this.profileForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: [{ value: '', disabled: true }, Validators.compose([Validators.required, ValidationService.emailValidator])],
        });
    }
    ngOnInit() {
        this.userService.getUser().subscribe((user) => {
            this.loading = false;
            this.initForm(user);
        }, error => console.log(error));
    }
    initForm(user) {
        this.user = user;
        this.profileForm.reset(user);
    }
    onSubmit(form, $event) {
        $event.preventDefault();
        this.saving = true;
        let data = this.profileForm.value;
        this.apiService.update('client/user', this.user.id, data).subscribe((response) => {
            this.saving = false;
            this.toastr.success('Perfil actualizado con exito');
            this.userService.getUser(true).subscribe((user) => {
                this.loading = false;
            }, error => console.log(error));
        }, (error) => {
            this.toastr.error(error);
            this.saving = false;
        });
    }
};
MyProfileComponent = __decorate([
    Component({
        selector: 'client-profile',
        templateUrl: 'my-profile.component.html',
        styleUrls: ['my-profile.component.scss']
    }), 
    __metadata('design:paramtypes', [FormBuilder, UserService, ToastsManager, ApiService])
], MyProfileComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/profile/my-profile/my-profile.component.js.map