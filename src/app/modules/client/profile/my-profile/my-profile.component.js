"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var validation_service_1 = require("../../../../components/forms/validation/validation.service");
var MyProfileComponent = (function () {
    function MyProfileComponent(formBuilder, userService, toastr, router, apiService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.toastr = toastr;
        this.router = router;
        this.apiService = apiService;
        this.profileForm = this.formBuilder.group({
            first_name: ['', [forms_1.Validators.required]],
            last_name: ['', [forms_1.Validators.required]],
            email: [{ value: '', disabled: true }, forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
        });
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.loading = false;
            _this.initForm(user);
        }, function (error) { return console.log(error); });
    };
    MyProfileComponent.prototype.initForm = function (user) {
        this.user = user;
        this.profileForm.reset(user);
    };
    MyProfileComponent.prototype.onSubmit = function (form, $event) {
        var _this = this;
        $event.preventDefault();
        this.saving = true;
        var data = this.profileForm.value;
        this.apiService.update('client/user', this.user.id, data).subscribe(function (response) {
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
    MyProfileComponent = __decorate([
        core_1.Component({
            selector: 'client-profile',
            templateUrl: 'my-profile.component.html',
            styleUrls: ['my-profile.component.scss']
        })
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;
