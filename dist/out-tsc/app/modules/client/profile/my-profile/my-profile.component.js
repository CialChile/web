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
import { objectToFormData } from "../../../../utilities/form/objectToFormData";
var MyProfileComponent = (function () {
    function MyProfileComponent(formBuilder, userService, toastr, apiService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.toastr = toastr;
        this.apiService = apiService;
        this.image = {
            objectURL: '',
            notDefault: false,
            deleted: false
        };
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
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.loading = false;
            _this.initForm(user);
            _this.image = {
                notDefault: !!user.image,
                deleted: false,
                objectURL: user.image,
            };
        }, function (error) { return console.log(error); });
    };
    MyProfileComponent.prototype.initForm = function (user) {
        this.user = user;
        this.profileForm.reset(user);
    };
    MyProfileComponent.prototype.imageChange = function (image) {
        this.image = image;
    };
    MyProfileComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        var formData = objectToFormData(this.profileForm.value);
        if (this.image instanceof File) {
            formData.append('image', this.image);
        }
        else if (this.image.deleted) {
            formData.append('removeImage', true);
        }
        this.saving = true;
        this.apiService.formDataUpdate('client/user', this.user.id, formData).subscribe(function (response) {
            _this.saving = false;
            _this.toastr.success('Perfil actualizado con exito');
            _this.userService.getUser(true).subscribe(function (user) {
                _this.loading = false;
            }, function (error) { return console.log(error); });
        }, function (error) {
            _this.toastr.error(error);
            _this.saving = false;
        });
    };
    return MyProfileComponent;
}());
MyProfileComponent = __decorate([
    Component({
        selector: 'client-profile',
        templateUrl: 'my-profile.component.html',
        styleUrls: ['my-profile.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, UserService,
        ToastsManager, ApiService])
], MyProfileComponent);
export { MyProfileComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/profile/my-profile/my-profile.component.js.map