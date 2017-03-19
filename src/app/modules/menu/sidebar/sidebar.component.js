"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SidebarComponent = (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input()
    ], SidebarComponent.prototype, "menu", void 0);
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'side-bar',
            providers: [],
            // Our list of styles in our component. We may add more to compose many styles together
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
