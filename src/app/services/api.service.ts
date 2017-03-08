import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share'
import {environment} from '../../environments/environment'
import {Response, Http} from "@angular/http";

@Injectable()
export class ApiService {

    constructor(private authHttp: AuthHttp,private http:Http) {
    }

    private actionUrl = environment.baseUrl;

    public GetAll = (path: string): Observable<any> => {
        let fullPath = this.actionUrl + path;
        let observable = this.http.get(fullPath).map(res => this.extractData(res));
        observable.subscribe(
            (res) => {
            },
            error => this.handleError(error, "GetAll", fullPath),
            () => {
            }
        );
        return observable;
    };

    public GetOne = (path: string): Observable<any> => {
        let fullPath = this.actionUrl + path;
        let observable = this.authHttp.get(fullPath).map(res => this.extractData(res));
        observable.subscribe(
            (res) => {
            },
            error => this.handleError(error, "GetOne", fullPath),
            () => {
            }
        );
        return observable;
    };

    public Create = (path: string, data): Observable<any> => {
        let fullPath = this.actionUrl + path;
        let observable = this.authHttp.post(fullPath, data).map(res => this.extractData(res));
        observable.subscribe(
            (res) => {
            },
            error => this.handleErrorData(error, "Create", fullPath, data),
            () => {
            }
        );
        return observable;
    };

    public Update = (path: string, id, data): Observable<any> => {
        let fullPath = this.actionUrl + path + '/' + id;
        let observable = this.authHttp.put(fullPath, data).map(res => this.extractData(res));
        observable.subscribe(
            (res) => {
            },
            error => this.handleErrorData(error, "Update", fullPath, data),
            () => {
            }
        );
        return observable;
    };

    public Delete = (path: string, id, data): Observable<any> => {
        let fullPath = this.actionUrl + path + '/' + id;
        let observable = this.authHttp.delete(fullPath).map(res => this.extractData(res));
        observable.subscribe(
            (res) => {
            },
            error => this.handleError(error, "Delete", fullPath),
            () => {
            }
        );
        return observable;
    };

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any, method: string, path: string) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        errMsg = `${errMsg}, Method: ${method}, Path:${path}`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private handleErrorData(error: any, method: string, path: string, data) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        errMsg = `${errMsg}, Method: ${method}, Path:${path}`;
        console.error(errMsg, data);
        return Observable.throw(errMsg);
    }


}
