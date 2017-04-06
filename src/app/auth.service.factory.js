"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_jwt_1 = require("angular2-jwt");
function authHttpServiceFactory(http, options) {
    return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
        tokenName: 'token',
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
exports.authHttpServiceFactory = authHttpServiceFactory;
