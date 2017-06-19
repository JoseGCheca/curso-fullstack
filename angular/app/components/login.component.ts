// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit {
    public titulo: string = "Identifícate";
    public user;
    public errorMessage;
    public token;
    public identity;
    constructor(private _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router) {

    }
    ngOnInit() {
        //alert(this._loginService.signup());

        this._route.params.subscribe(
            params=>{
                let logout = +params["id"];
                if(logout == 1){
                    localStorage.removeItem('identity');
                    localStorage.removeItem('token');
                    this.identity = null;
                    this.token = null;

                    window.location.href ="/"
                  //  this._router.navigate(["/index"]);
                }
            }
        )
        this.user = {
            "email": "",
            "password": "",
            "gethash": false
        };

        let identity = this._loginService.getIdentity();
        if(identity!= null && identity.sub){
            this._router.navigate(["/index"]);
        }

    }
    onSubmit() {
        console.log(this.user);
        this._loginService.signup(this.user).subscribe(
            response => {
                let identity = response;
                this.identity = identity;
                if (this.identity.length >= 0) {
                    alert("Error en el servidor");

                }
                else {
                    if (!this.identity.status) {
                        localStorage.setItem('identity', JSON.stringify(identity));

                        //GET TOKEN
                        this.user.gethash = "true";
                        this._loginService.signup(this.user).subscribe(
                            response => {
                                let token = response;
                                this.token = token;
                                if (this.token.length <= 0) {
                                    alert("Error en el servidor");
                                }
                                else {
                                    if (!this.token.status) {
                                        localStorage.setItem('token', token);
                                        //redireccion
                                          window.location.href ="/"
                                    }
                                }
                            },
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {

                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        )
                    }
                }
            
                console.log(response);
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {

                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }

            }
        )
    }

}