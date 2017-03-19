import {AuthHttp, AuthConfig} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}
