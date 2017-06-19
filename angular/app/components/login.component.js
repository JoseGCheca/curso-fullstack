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
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const login_service_1 = require('../services/login.service');
let LoginComponent = class LoginComponent {
    constructor(_loginService, _route, _router) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Identifícate";
    }
    ngOnInit() {
        this._route.params.subscribe(params => {
            let logout = +params["id"];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this.token = null;
                window.location.href = "/";
            }
        });
        this.user = {
            "email": "",
            "password": "",
            "gethash": false
        };
        let identity = this._loginService.getIdentity();
        if (identity != null && identity.sub) {
            this._router.navigate(["/index"]);
        }
    }
    onSubmit() {
        console.log(this.user);
        this._loginService.signup(this.user).subscribe(response => {
            let identity = response;
            this.identity = identity;
            if (this.identity.length >= 0) {
                alert("Error en el servidor");
            }
            else {
                if (!this.identity.status) {
                    localStorage.setItem('identity', JSON.stringify(identity));
                    this.user.gethash = "true";
                    this._loginService.signup(this.user).subscribe(response => {
                        let token = response;
                        this.token = token;
                        if (this.token.length <= 0) {
                            alert("Error en el servidor");
                        }
                        else {
                            if (!this.token.status) {
                                localStorage.setItem('token', token);
                                window.location.href = "/";
                            }
                        }
                    }, error => {
                        this.errorMessage = error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                }
            }
            console.log(response);
        }, error => {
            this.errorMessage = error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        });
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/view/login.html',
        providers: [login_service_1.LoginService]
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map