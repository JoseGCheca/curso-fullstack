// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UploadService } from '../services/upload.service';
import { VideoService } from '../services/video.service';
import { User } from '../model/user';
import { Video } from '../model/video';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video.new.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UploadService, LoginService, VideoService]
})

// Clase del componente donde irán los datos y funcionalidades
export class VideoNewComponent implements OnInit {
    public titulo = "Crear un nuevo vídeo";
    public user: User;
    public video: Video;
    public errorMessage;
    public status;
    public uploadedImage;

    constructor(
        private _loginService: LoginService,
        private _uploadService: UploadService,
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router) {
        this.uploadedImage = false;
    }

    ngOnInit() {
        console.log("Componente video.new.component cargado");
        this.video = new Video(1, "", "", "public", "null", "null", null, null);
    }
    onSubmit() {
        console.log(this.video);
        let token = this._loginService.getToken();
        this._videoService.create(token, this.video).subscribe(
            response => {
                this.status = response.status;
                if (this.status != "success") {
                    this.status = "error";
                    console.log(response);
                }
                else {
                    this.video = response.data;
                    console.log(response);
                }
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {

                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }
    callVideoStatus(value) {
        this.video.status = value;

    }
    public filesToUpload: Array<File>;
    public resultUpload;
    fileChangeEventImage(fileInput: any) {
        console.log("Evento change lanzado");
        this.filesToUpload = <Array<File>>fileInput.target.files;
        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/web/app_dev.php/video/upload-image/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
            (result) => {
                this.resultUpload = result;
                this.video.image = this.resultUpload.filename;
                console.log(this.video);
            },
            (error) => {
                console.log(error)
            }
        );
    }
    nextUploadVideo(){
        this.uploadedImage = true;
    }

    fileChangeEventVideo(fileInput: any) {
        console.log("Evento change lanzado");
        this.filesToUpload = <Array<File>>fileInput.target.files;
        let token = this._loginService.getToken();
        let url = "http://localhost/curso-fullstack/web/app_dev.php/video/upload-video/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then(
            (result) => {
                this.resultUpload = result;
                this.video.image = this.resultUpload.filename;
                console.log(this.video);
            },
            (error) => {
                console.log(error)
            }
        );
    }

    redirectToVideo(){
        this._router.navigate(['/index']);
    }
}