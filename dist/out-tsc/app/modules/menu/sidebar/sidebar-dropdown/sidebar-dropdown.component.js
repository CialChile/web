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
import { Menu } from "../../types/Menu";
export var SidebarDropdownComponent = (function () {
    function SidebarDropdownComponent() {
    }
    SidebarDropdownComponent.prototype.ngOnInit = function () {
    };
    SidebarDropdownComponent.prototype.anchorClicked = function (event) {
        var targetId = event.srcElement.id;
        var target = event.srcElement;
        if (!targetId && event.srcElement.classList.contains('fa')) {
            target = event.srcElement.parentElement;
        }
        if (target.parentElement.classList.contains('active')) {
            var dropdown = target.parentElement.querySelector('ul');
            SidebarDropdownComponent.slideUp(dropdown);
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
                    SidebarDropdownComponent.slideUp(menu);
                }
            }
            target.parentElement.classList.add('active');
            var dropdown = target.parentElement.querySelector('ul');
            SidebarDropdownComponent.slideDown(dropdown);
        }
    };
    SidebarDropdownComponent.slideDown = function (elem) {
        elem.style.maxHeight = '1000px';
        //   elem.style.opacity = '1';
    };
    SidebarDropdownComponent.slideUp = function (elem) {
        elem.style.maxHeight = '0';
        // elem.style.opacity = '0';
    };
    __decorate([
        Input(), 
        __metadata('design:type', Menu)
    ], SidebarDropdownComponent.prototype, "item", void 0);
    SidebarDropdownComponent = __decorate([
        Component({
            selector: 'app-sidebar-dropdown',
            templateUrl: './sidebar-dropdown.component.html',
            styleUrls: ['./sidebar-dropdown.component.scss'],
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarDropdownComponent);
    return SidebarDropdownComponent;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/sidebar/sidebar-dropdown/sidebar-dropdown.component.js.map