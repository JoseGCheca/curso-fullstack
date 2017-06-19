import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from "./components/login.component";
import { DefaultComponent } from "./components/default.component";
import { RegisterComponent } from "./components/register.component";
import { UserEditComponent } from "./components/user.edit.component";

export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: DefaultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
     { path: 'user-edit', component: UserEditComponent },
]

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]