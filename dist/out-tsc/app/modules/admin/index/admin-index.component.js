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
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { ADMINMENUITEMS } from "../menu/AdminMenuItems";
import { UserService } from "../../auth/services/user.service";
var AdminIndexComponent = (function () {
    function AdminIndexComponent(userService, router, toastr) {
        this.userService = userService;
        this.router = router;
        this.toastr = toastr;
        this.menu = ADMINMENUITEMS;
    }
    AdminIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        }, function (error) { return console.log(error); });
    };
    return AdminIndexComponent;
}());
AdminIndexComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin-index.component.html',
        styleUrls: ['./admin-index.component.scss']
    }),
    __metadata("design:paramtypes", [UserService, Router, ToastsManager])
], AdminIndexComponent);
export { AdminIndexComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/index/admin-index.component.js.map