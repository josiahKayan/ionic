import { Component } from '@angular/core';

/**
 * Generated class for the TurmasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'turmas',
  templateUrl: 'turmas.html'
})
export class TurmasComponent {

  text: string;

  constructor() {
    console.log('Hello TurmasComponent Component');
    this.text = 'Hello World';
  }

}
