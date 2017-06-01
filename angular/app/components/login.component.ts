// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    template: '<h1>Formulario de login</h1>'
})

// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent { }