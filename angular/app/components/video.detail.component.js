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
const video_service_1 = require('../services/video.service');
let VideoDetailComponent = class VideoDetailComponent {
    constructor(_loginService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Detalle del vídeo";
        this.loading = 'show';
    }
    ngOnInit() {
        this._route.params.subscribe(params => {
            let id = +params["id"];
            this._videoService.getVideo(id).subscribe(response => {
                this.video = response.data;
                this.status = response.status;
                if (status != 'success')
                    this._router.navigate(["/index"]);
                this.loading = 'hide';
            }, error => {
                this.errorMessage = error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
                this.loading = 'hide';
            });
        });
    }
};
VideoDetailComponent = __decorate([
    core_1.Component({
        selector: 'video-detail',
        templateUrl: 'app/view/video.detail.html',
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [login_service_1.LoginService, video_service_1.VideoService]
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
], VideoDetailComponent);
exports.VideoDetailComponent = VideoDetailComponent;
//# sourceMappingURL=video.detail.component.js.map