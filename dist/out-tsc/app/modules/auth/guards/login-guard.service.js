var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from "../services/user.service";
var LoginGuard = (function () {
    function LoginGuard(auth, userService, router) {
        this.auth = auth;
        this.userService = userService;
        this.router = router;
    }
    LoginGuard.prototype.canActivate = function () {
        var _this = this;
        if (this.auth.loggedIn()) {
            return this.userService.getUser().map(function (user) {
                if (user['isSuperUser']) {
                    _this.router.navigate(['/admin']);
                    return false;
                }
                _this.router.navigate(['/client/dashboard']);
                return false;
            });
        }
        return true;
    };
    return LoginGuard;
}());
LoginGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService, UserService, Router])
], LoginGuard);
export { LoginGuard };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/login-guard.service.js.map