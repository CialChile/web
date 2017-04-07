"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/share");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/http");
var ApiService = (function () {
    function ApiService(authHttp, http, router, toastr) {
        var _this = this;
        this.authHttp = authHttp;
        this.http = http;
        this.router = router;
        this.toastr = toastr;
        this.actionUrl = environment_1.environment.baseUrl;
        this.all = function (path, include, header) {
            var fullPath = _this.actionUrl + path;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return _this.authHttp.get(fullPath, header)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError.bind(_this));
        };
        this.one = function (path, id, include) {
            var fullPath = _this.actionUrl + path + '/' + id;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return _this.authHttp.get(fullPath)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError.bind(_this));
        };
        this.create = function (path, data) {
            var fullPath = _this.actionUrl + path;
            return _this.authHttp.post(fullPath, data)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError.bind(_this));
        };
        this.update = function (path, id, data) {
            var fullPath = _this.actionUrl + path + '/' + id;
            return _this.authHttp.put(fullPath, data)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError.bind(_this));
        };
        this.destroy = function (path, id) {
            var fullPath = _this.actionUrl + path + '/' + id;
            return _this.authHttp.delete(fullPath)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError.bind(_this));
        };
        this.formDataUpdate = function (path, id, data) {
            var headers = new http_1.Headers();
            //headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
            var options = new http_1.RequestOptions({ headers: headers });
            var fullPath = _this.actionUrl + path + '/' + id;
            data.append('_method', 'put');
            return _this.http.post(fullPath, data, options)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError);
        };
        this.formDataCreate = function (path, data) {
            var headers = new http_1.Headers();
            //headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
            var options = new http_1.RequestOptions({ headers: headers });
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
                if (error.status == 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('permissions');
                    this.router.navigate(['/login']);
                    this.toastr.error(errMsg);
                }
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
    ApiService.prototype.downloadDocument = function (assetId, documentId, mimeType) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        headers.append('Accept', mimeType);
        var options = new http_1.RequestOptions({ headers: headers, responseType: http_1.ResponseContentType.Blob });
        var url = this.actionUrl + 'client/assets/' + assetId + '/documents/' + documentId;
        return this.authHttp.get(url, options)
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
