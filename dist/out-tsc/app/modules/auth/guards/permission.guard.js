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
import { ToastrService } from "../../../services/toastr/toastr.service";
export let PermissionGuard = class PermissionGuard {
    constructor(router, toastr) {
        this.router = router;
        this.toastr = toastr;
    }
    canActivate(next, state) {
        const routePermission = next.data['permission'];
        let permissions = JSON.parse(localStorage.getItem('permissions'));
        if (!permissions) {
            permissions = [];
        }
        let permissionExist = permissions.filter((permission) => {
            return permission == routePermission;
        });
        if (permissionExist.length > 0) {
            return true;
        }
        //this.toastr.showError('No tienes permiso para acceder a este recurso');
        const redirectTo = next.data['redirectTo'];
        this.toastr.showError('No tiene permisos para acceder a esta sección');
        if (redirectTo) {
            this.router.navigate([redirectTo]);
            return false;
        }
        this.router.navigate(['/']);
        return false;
    }
    canActivateChild(route, state) {
        return this.canActivate(route, state);
    }
};
PermissionGuard = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Router, ToastrService])
], PermissionGuard);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/permission.guard.js.map