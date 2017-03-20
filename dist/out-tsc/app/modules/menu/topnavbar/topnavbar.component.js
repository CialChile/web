var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AuthService } from "../../auth/services/auth.service";
import { UserService } from "../../auth/services/user.service";
import { EventsService } from "../../../services/events/events.service";
var TopNavBarComponent = (function () {
    function TopNavBarComponent(authService, router, eventService, toastr, userService) {
        this.authService = authService;
        this.router = router;
        this.eventService = eventService;
        this.toastr = toastr;
        this.userService = userService;
    }
    TopNavBarComponent.prototype.toggleClicked = function (event) {
        var body = document.getElementsByTagName('body')[0];
        this.eventService.broadcast('menu-toggle');
        if (body.classList) {
            body.classList.toggle('nav-md');
            body.classList.toggle('nav-sm');
        }
        else {
            var classes = body.className.split(' ');
            var existingIndex = classes.indexOf('nav-md');
            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push('nav-md');
            existingIndex = classes.indexOf('nav-sm');
            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push('nav-sm');
            body.className = classes.join(' ');
        }
    };
    TopNavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        }, function (error) { return console.log(error); });
    };
    TopNavBarComponent.prototype.ngAfterViewInit = function () {
    };
    TopNavBarComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout().subscribe(function (data) {
            _this.router.navigate(['/login']);
            _this.toastr.success('Sesión Cerrada');
        }, function (error) { return console.log(error); });
    };
    return TopNavBarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], TopNavBarComponent.prototype, "userMenu", void 0);
TopNavBarComponent = __decorate([
    Component({
        selector: 'topnav-bar',
        providers: [],
        templateUrl: './topnavbar.component.html',
        styleUrls: ['./topnavbar.component.scss'],
    }),
    __metadata("design:paramtypes", [AuthService, Router, EventsService,
        ToastsManager, UserService])
], TopNavBarComponent);
export { TopNavBarComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/topnavbar/topnavbar.component.js.map