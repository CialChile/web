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
export var UserService = (function () {
    function UserService(authHttp) {
        this.authHttp = authHttp;
        this.url = environment.baseUrl + 'auth/user?include=roles,permissions';
    }
    UserService.prototype.getUser = function (refresh) {
        if (refresh) {
            this._user = null;
        }
        if (!this._user) {
            this._user = this.authHttp.get(this.url)
                .map(UserService.extractData)
                .publishReplay(1)
                .refCount()
                .catch(UserService.handleError);
        }
        return this._user;
    };
    UserService.extractData = function (res) {
        var user = res.json();
        localStorage.setItem('permissions', JSON.stringify(user.data.permissions));
        return user.data || {};
    };
    UserService.handleError = function (error) {
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
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [AuthHttp])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/user.service.js.map