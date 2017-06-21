// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { VideoService } from '../services/video.service';
import { User } from '../model/user';
import { Video } from '../model/video';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'video-detail',
    templateUrl: 'app/view/video.detail.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService]
})

// Clase del componente donde irán los datos y funcionalidades
export class VideoDetailComponent implements OnInit {
    public titulo = "Detalle del vídeo";
    public errorMessage;
    public video;
    public status;
    public loading = 'show';

    constructor(
        private _loginService: LoginService,

        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router) {

    }

    ngOnInit() {
        this._route.params.subscribe(
            params => {
                let id = +params["id"];
                this._videoService.getVideo(id).subscribe(
                    response => {
                        this.video = response.data;
                        this.status = response.status;

                        if (status != 'success')
                            this._router.navigate(["/index"]);

                        this.loading = 'hide';
                    },
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {

                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                        this.loading = 'hide';
                    }
                );
            }
        );

    }

}
