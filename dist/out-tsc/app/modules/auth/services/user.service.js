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
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';
import { AuthHttp } from "angular2-jwt";
import { environment } from "../../../../environments/environment";
import { ReplaySubject } from "rxjs";
let UserService_1 = class UserService {
    constructor(authHttp) {
        this.authHttp = authHttp;
        this.url = environment.baseUrl + 'auth/user?include=roles,permissions';
        this.userSubject = new ReplaySubject(1);
    }
    getUser(refresh) {
        if (refresh || !this._user) {
            this._user = this.authHttp.get(this.url)
                .map(UserService_1.extractData)
                .catch(UserService_1.handleError);
            this._user.subscribe(result => this.userSubject.next(result), err => this.userSubject.error(err));
        }
        return this.userSubject.asObservable();
    }
    getUserLogin() {
        this._user = null;
        return this.authHttp.get(this.url)
            .map(UserService_1.extractData)
            .catch(UserService_1.handleError);
    }
    static extractData(res) {
        let user = res.json();
        localStorage.setItem('permissions', JSON.stringify(user.data.permissions));
        return user.data || {};
    }
    static handleError(error) {
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
export let UserService = UserService_1;
UserService = UserService_1 = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [AuthHttp])
], UserService);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/user.service.js.map