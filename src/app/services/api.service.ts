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

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  private actionUrl = environment.baseUrl;

  public all = (path: string, include?: string): Observable<any> => {
    let fullPath = this.actionUrl + path;
    fullPath = include ? fullPath + '?include=' + include : fullPath;
    return this.authHttp.get(fullPath)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  };

  public one = (path: string, id: number, include?: string): Observable<any> => {
    let fullPath = this.actionUrl + path + '/' + id;
    fullPath = include ? fullPath + '?include=' + include : fullPath;
    return this.authHttp.get(fullPath)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  };

  public create = (path: string, data: any): Observable<any> => {
    let fullPath = this.actionUrl + path;
    return this.authHttp.post(fullPath, data)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  };

  public update = (path: string, id, data): Observable<any> => {
    let fullPath = this.actionUrl + path + '/' + id;
    return this.authHttp.put(fullPath, data)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  };

  public r = (path: string, id, data): Observable<any> => {
    let fullPath = this.actionUrl + path + '/' + id;
    return this.authHttp.delete(fullPath)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  };

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      if (body.hasOwnProperty('errors')) {
        let errorString = '';
        for (let apiError in body.errors) {
          errorString += body.errors[apiError] + ', ';
        }
        errMsg = errorString;
        errMsg = errMsg.substr(0, errMsg.length - 2)
      } else {
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }

    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    errMsg = `${errMsg}`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
