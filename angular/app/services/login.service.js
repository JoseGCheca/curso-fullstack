"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
let LoginService = class LoginService {
    constructor(_http) {
        this._http = _http;
        this.url = "http://localhost/curso-fullstack/web/app_dev.php";
    }
    signup(user_to_login) {
        let json = JSON.stringify(user_to_login);
        let params = "json=" + json;
        let headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this._http.post(this.url + "/login", params, { headers: headers }).map(res => res.json());
    }
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    }
    register(user_to_register) {
        let json = JSON.stringify(user_to_register);
        let params = "json=" + json;
        let headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this._http.post(this.url + "/user/new", params, { headers: headers }).map(res => res.json());
    }
    update_user(user_to_update) {
        let json = JSON.stringify(user_to_update);
        let params = "json=" + json + "&authorization=" + this.getToken();
        let headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this._http.post(this.url + "/user/edit", params, { headers: headers }).map(res => res.json());
    }
};
LoginService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map