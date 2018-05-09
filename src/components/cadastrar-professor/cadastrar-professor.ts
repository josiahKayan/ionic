import { Component } from '@angular/core';

/**
 * Generated class for the CadastrarProfessorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cadastrar-professor',
  templateUrl: 'cadastrar-professor.html'
})
export class CadastrarProfessorComponent {

  text: string;

  constructor() {
    console.log('Hello CadastrarProfessorComponent Component');
    this.text = 'Hello World';
  }

}
