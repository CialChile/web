import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay'
import {User} from '../types/User';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../../../environments/environment";
import {ReplaySubject} from "rxjs";

@Injectable()
export class UserService {
  private url = environment.baseUrl + 'auth/user?include=roles,permissions';
  user: User;
  private _user;
  private userSubject: any;

  constructor(private authHttp: AuthHttp) {
    this.userSubject = new ReplaySubject(1);
  }


  getUser(refresh?: boolean): Observable<User> {
    if (refresh || !this._user) {
      this._user = this.authHttp.get(this.url)
        .map(UserService.extractData)
        .catch(UserService.handleError);

      this._user.subscribe(
        result => this.userSubject.next(result),
        err => this.userSubject.error(err)
      );
    }
    return this.userSubject.asObservable();
  }

  getUserLogin(): Observable<User> {
    this._user = null;
    return this.authHttp.get(this.url)
      .map(UserService.extractData)
      .catch(UserService.handleError);
  }


  private static extractData(res) {
    let user = res.json();
    localStorage.setItem('permissions', JSON.stringify(user.data.permissions));
    return user.data || {};
  }

  private static handleError(error: any) {
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
