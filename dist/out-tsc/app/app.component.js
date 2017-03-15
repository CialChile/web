var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { environment } from '../environments/environment';
import { ToastsManager } from "ng2-toastr";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
export let AppComponent = class AppComponent {
    constructor(toastr, vcr, router) {
        this.toastr = toastr;
        this.router = router;
        this.title = environment.baseUrl;
        this._routeScrollPositions = [];
        this._subscriptions = [];
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
        this._subscriptions.push(
        // save or restore scroll position on route change
        this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
            if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
                this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
            }
            if (currRouteEvent instanceof NavigationEnd) {
                window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
            }
        }));
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }), 
    __metadata('design:paramtypes', [ToastsManager, ViewContainerRef, Router])
], AppComponent);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/app.component.js.map