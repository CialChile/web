"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdminMenuItems_1 = require("../menu/AdminMenuItems");
var AdminTopbarMenuItems_1 = require("../menu/AdminTopbarMenuItems");
var AdminIndexComponent = (function () {
    function AdminIndexComponent(userService, router, toastr) {
        this.userService = userService;
        this.router = router;
        this.toastr = toastr;
        this.menu = AdminMenuItems_1.ADMINMENUITEMS;
        this.topBarMenu = AdminTopbarMenuItems_1.ADMINTOPBARMENUITEMS;
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
    core_1.Component({
        selector: 'app-admin',
        templateUrl: './admin-index.component.html',
        styleUrls: ['./admin-index.component.scss']
    })
], AdminIndexComponent);
exports.AdminIndexComponent = AdminIndexComponent;
