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
import { Response } from "@angular/http";
import { Router } from "@angular/router";
export let ApiService = class ApiService {
    constructor(authHttp, router) {
        this.authHttp = authHttp;
        this.router = router;
        this.actionUrl = environment.baseUrl;
        this.all = (path, include) => {
            let fullPath = this.actionUrl + path;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return this.authHttp.get(fullPath)
                .map(res => this.extractData(res))
                .catch(this.handleError);
        };
        this.one = (path, id, include) => {
            let fullPath = this.actionUrl + path + '/' + id;
            fullPath = include ? fullPath + '?include=' + include : fullPath;
            return this.authHttp.get(fullPath)
                .map(res => this.extractData(res))
                .catch(this.handleError);
        };
        this.create = (path, data) => {
            let fullPath = this.actionUrl + path;
            return this.authHttp.post(fullPath, data)
                .map(res => this.extractData(res))
                .catch(this.handleError);
        };
        this.update = (path, id, data) => {
            let fullPath = this.actionUrl + path + '/' + id;
            return this.authHttp.put(fullPath, data)
                .map(res => this.extractData(res))
                .catch(this.handleError);
        };
        this.destroy = (path, id) => {
            let fullPath = this.actionUrl + path + '/' + id;
            return this.authHttp.delete(fullPath)
                .map(res => this.extractData(res))
                .catch(this.handleError);
        };
    }
    extractData(res) {
        let body = res.json();
        return body || {};
    }
    handleError(error) {
        let errMsg = '';
        if (error instanceof Response) {
            const body = error.json() || '';
            if (body.hasOwnProperty('errors')) {
                Object.keys(body.errors).forEach(function (key) {
                    errMsg += body.errors[key] + ' - ';
                });
                errMsg = errMsg.substr(0, errMsg.length - 3);
            }
            else {
                const err = body.message || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
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
    }
};
ApiService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [AuthHttp, Router])
], ApiService);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/api.service.js.map