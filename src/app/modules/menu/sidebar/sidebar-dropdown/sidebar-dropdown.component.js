"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SidebarDropdownComponent = (function () {
    function SidebarDropdownComponent(eventService) {
        this.eventService = eventService;
        this.eventService.on('menu-toggle', function () {
            for (var _i = 0, _a = document.getElementById('sidebar-menu').querySelectorAll('li'); _i < _a.length; _i++) {
                var menu = _a[_i];
                menu.classList.remove('active');
                menu.classList.remove('active-sm');
            }
            for (var _b = 0, _c = document.getElementById('sidebar-menu').querySelectorAll('li > ul'); _b < _c.length; _b++) {
                var menu = _c[_b];
                SidebarDropdownComponent.slideUp(menu);
            }
        });
    }
    SidebarDropdownComponent.prototype.ngOnInit = function () {
    };
    SidebarDropdownComponent.prototype.anchorClicked = function (event) {
        var targetId = event.srcElement.id;
        var target = event.srcElement;
        if (!targetId && event.srcElement.classList.contains('fa')) {
            target = event.srcElement.parentElement;
        }
        if (target.parentElement.classList.contains('active') && document.body.classList.contains('nav-md')) {
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
    SidebarDropdownComponent.prototype.linkClicked = function (event) {
        if (document.body.classList.contains('nav-sm')) {
            var targetUl = event.srcElement.parentElement.parentElement;
            SidebarDropdownComponent.slideUp(targetUl);
        }
    };
    __decorate([
        core_1.Input()
    ], SidebarDropdownComponent.prototype, "item", void 0);
    SidebarDropdownComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar-dropdown',
            templateUrl: './sidebar-dropdown.component.html',
            styleUrls: ['./sidebar-dropdown.component.scss'],
        })
    ], SidebarDropdownComponent);
    return SidebarDropdownComponent;
}());
exports.SidebarDropdownComponent = SidebarDropdownComponent;
