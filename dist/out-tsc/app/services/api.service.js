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
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { Router } from "@angular/router";
var ApiService = (function () {
    function ApiService(authHttp, http, router) {
        var _this = this;
        this.authHttp = authHttp;
        this.http = http;
        this.router = router;
        this.actionUrl = environment.baseUrl;
        this.all = function (path, include, header) {
            var fullPath = _this.actionUrl + path;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return _this.authHttp.get(fullPath, header)
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
        this.formDataUpdate = function (path, id, data) {
            var headers = new Headers();
            //headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
            var options = new RequestOptions({ headers: headers });
            var fullPath = _this.actionUrl + path + '/' + id;
            data.append('_method', 'put');
            return _this.http.post(fullPath, data, options)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.formDataCreate = function (path, data) {
            var headers = new Headers();
            //headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
            var options = new RequestOptions({ headers: headers });
            var fullPath = _this.actionUrl + path;
            return _this.http.post(fullPath, data, options)
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
        if (error instanceof Response) {
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
        return Observable.throw(errMsg);
    };
    return ApiService;
}());
ApiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthHttp, Http, Router])
], ApiService);
export { ApiService };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/api.service.js.map