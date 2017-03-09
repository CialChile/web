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
import { AuthHttp } from "angular2-jwt";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';
import { Response, Http } from "@angular/http";
export var ApiService = (function () {
    function ApiService(authHttp, http) {
        var _this = this;
        this.authHttp = authHttp;
        this.http = http;
        this.actionUrl = environment.baseUrl;
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
        this.r = function (path, id, data) {
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
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            if (body.hasOwnProperty('errors')) {
                var errorString = '';
                for (var apiError in body.errors) {
                    errorString += body.errors[apiError] + ', ';
                }
                errMsg = errorString;
                errMsg = errMsg.substr(0, errMsg.length - 2);
            }
            else {
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        errMsg = "" + errMsg;
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    ApiService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [AuthHttp, Http])
    ], ApiService);
    return ApiService;
}());
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/api.service.js.map