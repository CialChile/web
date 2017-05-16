import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthHttp} from "angular2-jwt";
import {ReplaySubject, Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class NotificationsService {
  private url = environment.baseUrl + 'client/user/notifications/latest';
  private allUrl = environment.baseUrl + 'client/user/notifications';
  private _latestNotifications: any;
  private latestNotificationsSubject: any;

  constructor(private authHttp: AuthHttp) {
    this.latestNotificationsSubject = new ReplaySubject(1);
  }

  getLatest(refresh?: boolean): Observable<any> {
    if (refresh || !this._latestNotifications) {
      this._latestNotifications = this.authHttp.get(this.url)
        .map(NotificationsService.extractData)
        .catch(NotificationsService.handleError);

      this._latestNotifications.subscribe(
        result => this.latestNotificationsSubject.next(result),
        err => this.latestNotificationsSubject.error(err)
      );
    }
    return this.latestNotificationsSubject.asObservable();
  }

  paginate(page: number = 1): Observable<any> {
    return this.authHttp.get(this.allUrl + '?page=' + page)
      .map(NotificationsService.extractData)
      .catch(NotificationsService.handleError);
  }

  markAsRead(id): Observable<any> {
    return this.authHttp.post(this.allUrl + '/read/' + id, {})
      .map(NotificationsService.extractData)
      .catch(NotificationsService.handleError);
  }

  markAllAsRead(): Observable<any> {
    return this.authHttp.post(this.allUrl + '/read/all', {})
      .map(NotificationsService.extractData)
      .catch(NotificationsService.handleError);
  }

  private static extractData(res) {
    let notifications = res.json();
    return notifications || {};
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
