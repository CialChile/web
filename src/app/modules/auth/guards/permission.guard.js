"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PermissionGuard = (function () {
    function PermissionGuard(router, toastr) {
        this.router = router;
        this.toastr = toastr;
    }
    PermissionGuard.prototype.canActivate = function (next, state) {
        var routePermission = next.data['permission'];
        var permissions = JSON.parse(localStorage.getItem('permissions'));
        if (!permissions) {
            permissions = [];
        }
        var permissionExist = permissions.filter(function (permission) {
            return permission == routePermission;
        });
        if (permissionExist.length > 0) {
            return true;
        }
        //this.toastr.showError('No tienes permiso para acceder a este recurso');
        var redirectTo = next.data['redirectTo'];
        this.toastr.showError('No tiene permisos para acceder a esta sección');
        if (redirectTo) {
            this.router.navigate([redirectTo]);
            return false;
        }
        this.router.navigate(['/']);
        return false;
    };
    PermissionGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    return PermissionGuard;
}());
PermissionGuard = __decorate([
    core_1.Injectable()
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
