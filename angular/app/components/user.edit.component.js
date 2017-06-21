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
const upload_service_1 = require('../services/upload.service');
const user_1 = require('../model/user');
let UserEditComponent = class UserEditComponent {
    constructor(_loginService, _route, _router, _uploadService) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
        this._uploadService = _uploadService;
        this.titulo = "Registro";
    }
    ngOnInit() {
        let identity = this._loginService.getIdentity();
        this.identity = identity;
        if (identity == null) {
            this._router.navigate(["/index"]);
        }
        else {
            this.user = new user_1.User(identity.sub, identity.role, identity.name, identity.surname, identity.email, identity.password, "null");
        }
    }
    onSubmit() {
        console.log(this.user);
        this.newPwd = this.user.password;
        if (this.user.password == this.identity.password) {
            this.user.password = "";
        }
        this._loginService.update_user(this.user).subscribe(response => {
            this.status = response.status;
            if (this.status != "success") {
                this.status = "error";
            }
            else {
                if (this.user.password == this.identity.password) {
                    this.user.password = this.identity.password;
                }
                else {
                    this.user.password = this.newPwd;
                }
                localStorage.setItem('identity', JSON.stringify(this.user));
            }
        }, error => {
            this.errorMessage = error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        });
    }
    fileChangeEvent(fileInput) {
        console.log("Evento change lanzado");
        this.filesToUpload = fileInput.target.files;
        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/web/app_dev.php/user/upload-image-user";
        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then((result) => {
            this.resultUpload = result;
            console.log(this.resultUpload);
        }, (error) => {
            console.log(error);
        });
    }
};
UserEditComponent = __decorate([
    core_1.Component({
        selector: 'user-edit',
        templateUrl: 'app/view/user.edit.html',
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [login_service_1.LoginService, upload_service_1.UploadService]
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router, upload_service_1.UploadService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user.edit.component.js.map