// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'user-edit',
    templateUrl: 'app/view/user.edit.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class UserEditComponent implements OnInit {
    public titulo = "Registro";
    public user: User;
    public errorMessage;
    public status;

    constructor(private _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit() {
        let identity = this._loginService.getIdentity();
        if (identity == null) {
            this._router.navigate(["/index"]);
        }
        else {
        this.user = new User(identity.sub, identity.role, identity.name, identity.surname, identity.email, identity.password, "null");
        }
    }
    onSubmit() {
        console.log(this.user);
        this._loginService.update_user(this.user).subscribe(
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