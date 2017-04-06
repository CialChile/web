"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../environments/environment");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(toastr, vRef, router) {
        this.toastr = toastr;
        this.router = router;
        this.title = environment_1.environment.baseUrl;
        this._routeScrollPositions = [];
        this._subscriptions = [];
        this.toastr.setRootViewContainerRef(vRef);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscriptions.push(
        // save or restore scroll position on route change
        this.router.events.pairwise().subscribe(function (_a) {
            var prevRouteEvent = _a[0], currRouteEvent = _a[1];
            if (prevRouteEvent instanceof router_1.NavigationEnd && currRouteEvent instanceof router_1.NavigationStart) {
                _this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
            }
            if (currRouteEvent instanceof router_1.NavigationEnd) {
                window.scrollTo(0, _this._routeScrollPositions[currRouteEvent.url] || 0);
            }
        }));
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
