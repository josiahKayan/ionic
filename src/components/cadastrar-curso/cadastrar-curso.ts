import { Component } from '@angular/core';

/**
 * Generated class for the CadastrarCursoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cadastrar-curso',
  templateUrl: 'cadastrar-curso.html'
})
export class CadastrarCursoComponent {

  text: string;

  constructor() {
    console.log('Hello CadastrarCursoComponent Component');
    this.text = 'Hello World';
  }

}
