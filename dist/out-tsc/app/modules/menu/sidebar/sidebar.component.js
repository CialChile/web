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
export var SidebarComponent = (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
    }
    SidebarComponent.prototype.anchorClicked = function (event) {
        var targetId = event.srcElement.id;
        var target = event.srcElement;
        if (!targetId && event.srcElement.classList.contains('fa')) {
            target = event.srcElement.parentElement;
        }
        if (target.parentElement.classList.contains('active')) {
            var dropdown = target.parentElement.querySelector('ul');
            SidebarComponent.slideUp(dropdown);
            target.parentElement.classList.remove('active');
            target.parentElement.classList.remove('active-sm');
        }
        else {
            if (!target.parentElement.classList.contains('child_menu')) {
                for (var _i = 0, _a = document.getElementById('sidebar-menu').querySelectorAll('li'); _i < _a.length; _i++) {
                    var menu = _a[_i];
                    menu.classList.remove('active');
                    menu.classList.remove('active-sm');
                }
                for (var _b = 0, _c = document.getElementById('sidebar-menu').querySelectorAll('li > ul'); _b < _c.length; _b++) {
                    var menu = _c[_b];
                    SidebarComponent.slideUp(menu);
                }
            }
            target.parentElement.classList.add('active');
            var dropdown = target.parentElement.querySelector('ul');
            SidebarComponent.slideDown(dropdown);
        }
    };
    SidebarComponent.slideDown = function (elem) {
        elem.style.maxHeight = '1000px';
        //   elem.style.opacity = '1';
    };
    SidebarComponent.slideUp = function (elem) {
        elem.style.maxHeight = '0';
        // elem.style.opacity = '0';
    };
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        }, function (error) { return console.log(error); });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
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
        __metadata('design:paramtypes', [UserService])
    ], SidebarComponent);
    return SidebarComponent;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/sidebar/sidebar.component.js.map