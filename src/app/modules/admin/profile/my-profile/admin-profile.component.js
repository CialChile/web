"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../../components/forms/validation/validation.service");
var objectToFormData_1 = require("../../../../utilities/form/objectToFormData");
var AdminProfileComponent = (function () {
    function AdminProfileComponent(formBuilder, userService, toastr, apiService) {
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
            first_name: ['', [forms_1.Validators.required]],
            last_name: ['', [forms_1.Validators.required]],
            email: [{ value: '', disabled: true }, forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
        });
    }
    AdminProfileComponent.prototype.ngOnInit = function () {
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
    AdminProfileComponent.prototype.initForm = function (user) {
        this.user = user;
        this.profileForm.reset(user);
    };
    AdminProfileComponent.prototype.imageChange = function (image) {
        this.image = image;
    };
    AdminProfileComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        var formData = objectToFormData_1.objectToFormData(this.profileForm.value);
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
    return AdminProfileComponent;
}());
AdminProfileComponent = __decorate([
    core_1.Component({
        selector: 'admin-profile',
        templateUrl: 'admin-profile.component.html',
        styleUrls: ['admin-profile.component.scss']
    })
], AdminProfileComponent);
exports.AdminProfileComponent = AdminProfileComponent;
