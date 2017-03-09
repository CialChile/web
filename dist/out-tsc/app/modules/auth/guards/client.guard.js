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
import { Observable } from 'rxjs/Observable';
import { UserService } from "../services/user.service";
export var ClientGuard = (function () {
    function ClientGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    ClientGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.userService.getUser().map(function (user) {
            if (user['isSuperUser']) {
                _this.router.navigate(['/login']);
                return Observable.of(false);
            }
            return !user['isSuperUser'];
        });
    };
    ClientGuard = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [UserService, Router])
    ], ClientGuard);
    return ClientGuard;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/client.guard.js.map