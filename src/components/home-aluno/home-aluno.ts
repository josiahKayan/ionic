import { Component } from '@angular/core';

/**
 * Generated class for the HomeAlunoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-aluno',
  templateUrl: 'home-aluno.html'
})
export class HomeAlunoComponent {

  text: string;

  constructor() {
    console.log('Hello HomeAlunoComponent Component');
    this.text = 'Hello World';
  }

}
