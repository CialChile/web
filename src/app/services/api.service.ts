import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share'
import {environment} from '../../environments/environment'
import {Response, Headers, RequestOptions, Http} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {

  constructor(private authHttp: AuthHttp, private http: Http, private router: Router) {
  }

  private actionUrl = environment.baseUrl;

  public all = (path: string, include?: string, header?): Observable<any> => {
    let fullPath = this.actionUrl + path;
    fullPath = include ? fullPath + '?include=' + include : fullPath;
    return this.authHttp.get(fullPath, header)
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

  public destroy = (path: string, id): Observable<any> => {
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
    let errMsg: string = '';
    if (error instanceof Response) {
      const body = error.json() || '';
      if (body.hasOwnProperty('errors')) {
        Object.keys(body.errors).forEach(function (key) {
          errMsg += body.errors[key] + ' - '
        });
        errMsg = errMsg.substr(0, errMsg.length - 3);
      } else {
        const err = body.message || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
      if (errMsg == 'No JWT present or has expired') {
        errMsg = 'Sessión Expiro';
        this.router.navigate(['/login'])
      }
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public formDataUpdate = (path: string, id, data) => {
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let fullPath = this.actionUrl + path + '/' + id;
    data.append('_method', 'put');
    return this.http.post(fullPath, data, options)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  }

  public formDataCreate = (path: string, data) => {
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let fullPath = this.actionUrl + path;
    return this.http.post(fullPath, data, options)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  }


}
