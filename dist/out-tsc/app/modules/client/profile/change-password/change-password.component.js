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
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(formBuilder, toastr, apiService) {
        this.formBuilder = formBuilder;
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
                active: false
            },
            {
                title: 'Cambiar Contraseña',
                link: '/client/my-profile/change-password',
                active: true
            }
        ];
        this.changePasswordForm = this.formBuilder.group({
            old_password: ['', [Validators.required]],
            new_password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            new_password_confirmation: ['', [Validators.required]],
        });
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
    };
    ChangePasswordComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        this.saving = true;
        var data = this.changePasswordForm.value;
        this.apiService.create('client/user/change-password', data).subscribe(function (response) {
            _this.saving = false;
            _this.toastr.success('Contraseña Actualizada');
        }, function (error) {
            _this.toastr.error(error);
            _this.saving = false;
        });
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    Component({
        selector: 'client-change-password',
        templateUrl: './change-password.component.html',
        styleUrls: ['./change-password.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ToastsManager, ApiService])
], ChangePasswordComponent);
export { ChangePasswordComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/profile/change-password/change-password.component.js.map