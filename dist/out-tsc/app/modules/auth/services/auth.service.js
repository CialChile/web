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
export let AuthService = class AuthService {
    constructor(http, authHttp, userService) {
        this.http = http;
        this.authHttp = authHttp;
        this.userService = userService;
        this.loginUrl = environment.baseUrl + 'auth/login';
        this.logoutUrl = environment.baseUrl + 'auth/logout';
    }
    loggedIn() {
        return tokenNotExpired('token');
    }
    login(credentials) {
        return this.http.post(this.loginUrl, credentials)
            .map(this.extractLoginData)
            .catch(this.handleError);
    }
    logout() {
        return this.authHttp.post(this.logoutUrl, {})
            .map(this.extractLogoutData)
            .catch(this.handleError);
    }
    extractLoginData(res) {
        let body = res.json();
        return body.token || {};
    }
    extractLogoutData(res) {
        let body = res.json();
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return body || {};
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
};
AuthService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Http, AuthHttp, UserService])
], AuthService);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/auth.service.js.map