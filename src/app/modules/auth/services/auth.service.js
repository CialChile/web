"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var Observable_1 = require('rxjs/Observable');
var http_1 = require("@angular/http");
require('rxjs/add/observable/throw');
require('rxjs/add/operator/do');
var environment_1 = require("../../../../environments/environment");
var AuthService = (function () {
    function AuthService(http, authHttp, userService) {
        this.http = http;
        this.authHttp = authHttp;
        this.userService = userService;
        this.loginUrl = environment_1.environment.baseUrl + 'auth/login';
        this.logoutUrl = environment_1.environment.baseUrl + 'auth/logout';
    }
    AuthService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired('token');
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
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
