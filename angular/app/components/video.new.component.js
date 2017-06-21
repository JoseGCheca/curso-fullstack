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
const video_service_1 = require('../services/video.service');
const video_1 = require('../model/video');
let VideoNewComponent = class VideoNewComponent {
    constructor(_loginService, _uploadService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._uploadService = _uploadService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Crear un nuevo vídeo";
        this.uploadedImage = false;
    }
    ngOnInit() {
        console.log("Componente video.new.component cargado");
        this.video = new video_1.Video(1, "", "", "public", "null", "null", null, null);
    }
    onSubmit() {
        console.log(this.video);
        let token = this._loginService.getToken();
        this._videoService.create(token, this.video).subscribe(response => {
            this.status = response.status;
            if (this.status != "success") {
                this.status = "error";
                console.log(response);
            }
            else {
                this.video = response.data;
                console.log(response);
            }
        }, error => {
            this.errorMessage = error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        });
    }
    callVideoStatus(value) {
        this.video.status = value;
    }
    fileChangeEventImage(fileInput) {
        console.log("Evento change lanzado");
        this.filesToUpload = fileInput.target.files;
        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/web/app_dev.php/video/upload-image/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then((result) => {
            this.resultUpload = result;
            this.video.image = this.resultUpload.filename;
            console.log(this.video);
        }, (error) => {
            console.log(error);
        });
    }
    nextUploadVideo() {
        this.uploadedImage = true;
    }
    fileChangeEventVideo(fileInput) {
        console.log("Evento change lanzado");
        this.filesToUpload = fileInput.target.files;
        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/web/app_dev.php/video/upload-video/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then((result) => {
            this.resultUpload = result;
            this.video.image = this.resultUpload.filename;
            console.log(this.video);
        }, (error) => {
            console.log(error);
        });
    }
    redirectToVideo() {
        this._router.navigate(['/index']);
    }
};
VideoNewComponent = __decorate([
    core_1.Component({
        selector: 'video-new',
        templateUrl: 'app/view/video.new.html',
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [upload_service_1.UploadService, login_service_1.LoginService, video_service_1.VideoService]
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService, upload_service_1.UploadService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
], VideoNewComponent);
exports.VideoNewComponent = VideoNewComponent;
//# sourceMappingURL=video.new.component.js.map