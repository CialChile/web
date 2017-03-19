"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
require('rxjs/add/operator/share');
var environment_1 = require('../../environments/environment');
var http_1 = require("@angular/http");
var ApiService = (function () {
    function ApiService(authHttp, router) {
        var _this = this;
        this.authHttp = authHttp;
        this.router = router;
        this.actionUrl = environment_1.environment.baseUrl;
        this.all = function (path, include) {
            var fullPath = _this.actionUrl + path;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return _this.authHttp.get(fullPath)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.one = function (path, id, include) {
            var fullPath = _this.actionUrl + path + '/' + id;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return _this.authHttp.get(fullPath)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.create = function (path, data) {
            var fullPath = _this.actionUrl + path;
            return _this.authHttp.post(fullPath, data)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.update = function (path, id, data) {
            var fullPath = _this.actionUrl + path + '/' + id;
            return _this.authHttp.put(fullPath, data)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.destroy = function (path, id) {
            var fullPath = _this.actionUrl + path + '/' + id;
            return _this.authHttp.delete(fullPath)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
    }
    ApiService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ApiService.prototype.handleError = function (error) {
        var errMsg = '';
        if (error instanceof http_1.Response) {
            var body_1 = error.json() || '';
            if (body_1.hasOwnProperty('errors')) {
                Object.keys(body_1.errors).forEach(function (key) {
                    errMsg += body_1.errors[key] + ' - ';
                });
                errMsg = errMsg.substr(0, errMsg.length - 3);
            }
            else {
                var err = body_1.message || JSON.stringify(body_1);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
            if (errMsg == 'No JWT present or has expired') {
                errMsg = 'Sessión Expiro';
                this.router.navigate(['/login']);
            }
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ApiService = __decorate([
        core_1.Injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
