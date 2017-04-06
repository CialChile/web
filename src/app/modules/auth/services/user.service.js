"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/publishReplay");
var environment_1 = require("../../../../environments/environment");
var rxjs_1 = require("rxjs");
var UserService = UserService_1 = (function () {
    function UserService(authHttp) {
        this.authHttp = authHttp;
        this.url = environment_1.environment.baseUrl + 'auth/user?include=roles,permissions';
        this.userSubject = new rxjs_1.ReplaySubject(1);
    }
    UserService.prototype.getUser = function (refresh) {
        var _this = this;
        if (refresh || !this._user) {
            this._user = this.authHttp.get(this.url)
                .map(UserService_1.extractData)
                .catch(UserService_1.handleError);
            this._user.subscribe(function (result) { return _this.userSubject.next(result); }, function (err) { return _this.userSubject.error(err); });
        }
        return this.userSubject.asObservable();
    };
    UserService.prototype.getUserLogin = function () {
        this._user = null;
        return this.authHttp.get(this.url)
            .map(UserService_1.extractData)
            .catch(UserService_1.handleError);
    };
    UserService.extractData = function (res) {
        var user = res.json();
        localStorage.setItem('permissions', JSON.stringify(user.data.permissions));
        return user.data || {};
    };
    UserService.handleError = function (error) {
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
    return UserService;
}());
UserService = UserService_1 = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
var UserService_1;
