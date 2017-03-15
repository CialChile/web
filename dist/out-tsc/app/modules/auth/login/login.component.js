var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { UserService } from "../services/user.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ValidationService } from "../../../components/forms/validation/validation.service";
export let LoginComponent = class LoginComponent {
    constructor(authService, router, toastr, userService, formBuilder) {
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
            'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'password': ['', [Validators.required]],
        });
    }
    onSubmit() {
        if (this.loginForm.dirty && this.loginForm.valid) {
            this.credentials = this.loginForm.value;
            this.loginIn = true;
            this.authService.login(this.credentials).subscribe((token) => {
                localStorage.removeItem('token');
                localStorage.setItem('token', token);
                localStorage.removeItem('permissions');
                this.toastr.success('Inicio de sesión exitoso');
                this.userService.getUserLogin().subscribe((user) => {
                    localStorage.setItem('permissions', JSON.stringify(user.permissions));
                    this.loginIn = false;
                    this.user = user;
                    if (this.user['isSuperUser']) {
                        this.router.navigate(['/admin/dashboard']);
                    }
                    else {
                        this.router.navigate(['/client/dashboard']);
                    }
                }, error => this.loginIn = false);
            }, (error) => {
                this.toastr.error(error);
                this.loginIn = false;
            });
        }
    }
    ngOnDestroy() {
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }), 
    __metadata('design:paramtypes', [AuthService, Router, ToastsManager, UserService, FormBuilder])
], LoginComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/login/login.component.js.map