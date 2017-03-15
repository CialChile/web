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
import { EventsService } from "../../../../services/events/events.service";
let SidebarDropdownComponent_1 = class SidebarDropdownComponent {
    constructor(eventService) {
        this.eventService = eventService;
        this.eventService.on('menu-toggle', () => {
            for (let menu of document.getElementById('sidebar-menu').querySelectorAll('li')) {
                menu.classList.remove('active');
                menu.classList.remove('active-sm');
            }
            for (let menu of document.getElementById('sidebar-menu').querySelectorAll('li > ul')) {
                SidebarDropdownComponent_1.slideUp(menu);
            }
        });
    }
    ngOnInit() {
    }
    anchorClicked(event) {
        var targetId = event.srcElement.id;
        var target = event.srcElement;
        if (!targetId && event.srcElement.classList.contains('fa')) {
            target = event.srcElement.parentElement;
        }
        if (target.parentElement.classList.contains('active') && document.body.classList.contains('nav-md')) {
            var dropdown = target.parentElement.querySelector('ul');
            SidebarDropdownComponent_1.slideUp(dropdown);
            target.parentElement.classList.remove('active');
            target.parentElement.classList.remove('active-sm');
        }
        else {
            if (!target.parentElement.classList.contains('child_menu')) {
                for (let menu of document.getElementById('sidebar-menu').querySelectorAll('li')) {
                    menu.classList.remove('active');
                    menu.classList.remove('active-sm');
                }
                for (let menu of document.getElementById('sidebar-menu').querySelectorAll('li > ul')) {
                    SidebarDropdownComponent_1.slideUp(menu);
                }
            }
            target.parentElement.classList.add('active');
            var dropdown = target.parentElement.querySelector('ul');
            SidebarDropdownComponent_1.slideDown(dropdown);
        }
    }
    static slideDown(elem) {
        elem.style.maxHeight = '1000px';
        //   elem.style.opacity = '1';
    }
    static slideUp(elem) {
        elem.style.maxHeight = '0';
        // elem.style.opacity = '0';
    }
    linkClicked(event) {
        if (document.body.classList.contains('nav-sm')) {
            let targetUl = event.srcElement.parentElement.parentElement;
            SidebarDropdownComponent_1.slideUp(targetUl);
        }
    }
};
export let SidebarDropdownComponent = SidebarDropdownComponent_1;
__decorate([
    Input(), 
    __metadata('design:type', Object)
], SidebarDropdownComponent.prototype, "item", void 0);
SidebarDropdownComponent = SidebarDropdownComponent_1 = __decorate([
    Component({
        selector: 'app-sidebar-dropdown',
        templateUrl: './sidebar-dropdown.component.html',
        styleUrls: ['./sidebar-dropdown.component.scss'],
    }), 
    __metadata('design:paramtypes', [EventsService])
], SidebarDropdownComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/menu/sidebar/sidebar-dropdown/sidebar-dropdown.component.js.map