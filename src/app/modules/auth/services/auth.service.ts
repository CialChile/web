import {Injectable} from '@angular/core';
import {tokenNotExpired, AuthHttp} from 'angular2-jwt';
import {Credentials} from "../types/Credentials";
import {Observable} from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do'
import {UserService} from "./user.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
    private loginUrl = environment.baseUrl + 'auth/login';
    private logoutUrl = environment.baseUrl + 'auth/logout';

    constructor(private http: Http, private authHttp: AuthHttp, private userService: UserService) {
    }

    loggedIn() {
        return tokenNotExpired('token');
    }

    login(credentials: Credentials): Observable<Object> {
        return this.http.post(this.loginUrl, credentials)
            .map(this.extractLoginData)
            .catch(this.handleError);
    }

    logout(): Observable<Object> {
        return this.authHttp.post(this.logoutUrl, {})
            .map(this.extractLogoutData)
            .catch(this.handleError);
    }

    private extractLoginData(res: Response) {
        let body = res.json();
        localStorage.setItem('token', body.token);
        return body.token || {};
    }

    private extractLogoutData(res: Response) {
        let body = res.json();
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
