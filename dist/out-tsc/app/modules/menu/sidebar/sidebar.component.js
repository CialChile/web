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
import { UserService } from "../../auth/services/user.service";
var SidebarComponent = (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
            _this.profilePicture = user.thumb ? user.thumb : 'assets/img/missing.png';
        }, function (error) { return console.log(error); });
    };
    return SidebarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "menu", void 0);
SidebarComponent = __decorate([
    Component({
        selector: 'side-bar',
        providers: [],
        // Our list of styles in our component. We may add more to compose many styles together
        // Every Angular template is first compiled by the browser before Angular runs it's compiler
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss'],
    }),
    __metadata("design:paramtypes", [UserService])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/sidebar/sidebar.component.js.map