var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from "@angular/http";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { UserService } from "./user.service";
import { environment } from "../../../../environments/environment";
export var AuthService = (function () {
    function AuthService(http, authHttp, userService) {
        this.http = http;
        this.authHttp = authHttp;
        this.userService = userService;
        this.loginUrl = environment.baseUrl + 'auth/login';
        this.logoutUrl = environment.baseUrl + 'auth/logout';
    }
    AuthService.prototype.loggedIn = function () {
        return tokenNotExpired('token');
    };
    AuthService.prototype.login = function (credentials) {
        return this.http.post(this.loginUrl, credentials)
            .map(this.extractLoginData)
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        return this.authHttp.post(this.logoutUrl, {})
            .map(this.extractLogoutData)
            .catch(this.handleError);
    };
    AuthService.prototype.extractLoginData = function (res) {
        var body = res.json();
        localStorage.setItem('token', body.token);
        return body.token || {};
    };
    AuthService.prototype.extractLogoutData = function (res) {
        var body = res.json();
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return body || {};
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    AuthService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AuthHttp, UserService])
    ], AuthService);
    return AuthService;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/auth.service.js.map