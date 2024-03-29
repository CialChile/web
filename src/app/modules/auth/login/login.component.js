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
var validation_service_1 = require("../../../components/forms/validation/validation.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router, toastr, userService, formBuilder) {
        this.authService = authService;
        this.router = router;
        this.toastr = toastr;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.credentials = {
            email: null,
            password: null
        };
        this.loginIn = false;
        this.loginForm = this.formBuilder.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.emailValidator])],
            'password': ['', [forms_1.Validators.required]],
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.loginForm.dirty && this.loginForm.valid) {
            this.credentials = this.loginForm.value;
            this.loginIn = true;
            this.authService.login(this.credentials).subscribe(function (token) {
                localStorage.removeItem('token');
                localStorage.setItem('token', token);
                localStorage.removeItem('permissions');
                _this.userService.getUserLogin().subscribe(function (user) {
                    localStorage.setItem('permissions', JSON.stringify(user.permissions));
                    _this.toastr.success('Inicio de sesión exitoso');
                    _this.user = user;
                    if (_this.user['isSuperUser']) {
                        _this.router.navigate(['/admin/dashboard']);
                    }
                    else {
                        _this.router.navigate(['/client/dashboard']);
                    }
                }, function (error) { return _this.loginIn = false; });
            }, function (error) {
                _this.toastr.error(error);
                _this.loginIn = false;
            });
        }
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
