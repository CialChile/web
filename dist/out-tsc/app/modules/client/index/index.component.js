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
import { CLIENTSIDEBARMENUITEMS } from "../menu/ClientSidebarMenuItems";
import { CLIENTTOPBARMENUITEMS } from "../menu/ClientTopbarMenuItems";
import { UserService } from "../../auth/services/user.service";
export let IndexComponent = class IndexComponent {
    constructor(userService, router, toastr) {
        this.userService = userService;
        this.router = router;
        this.toastr = toastr;
        this.menu = CLIENTSIDEBARMENUITEMS;
        this.topBarMenu = CLIENTTOPBARMENUITEMS;
    }
    ngOnInit() {
        this.userService.getUser().subscribe((user) => {
            this.user = user;
        }, error => console.log(error));
    }
};
IndexComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    }), 
    __metadata('design:paramtypes', [UserService, Router, ToastsManager])
], IndexComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/index/index.component.js.map