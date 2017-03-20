import { AuthHttp, AuthConfig } from "angular2-jwt";
export function authHttpServiceFactory(http, options) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/auth.service.factory.js.map