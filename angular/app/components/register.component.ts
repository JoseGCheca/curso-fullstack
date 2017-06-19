// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'register',
    templateUrl: 'app/view/register.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class RegisterComponent implements OnInit {
    public titulo = "Registro";
    public user: User;
    public errorMessage;
    public status;

    constructor(private _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit() {
        this.user = new User(1, "user", "", "", "", "", "");
    }
    onSubmit() {
        console.log(this.user);
        this._loginService.register(this.user).subscribe(
            response => {
                this.status = response.status;
                if (this.status != "success") {
                    this.status = "error";
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
}