import { Component } from '@angular/core';

/**
 * Generated class for the LeituraQrcodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'leitura-qrcode',
  templateUrl: 'leitura-qrcode.html'
})
export class LeituraQrcodeComponent {

  text: string;

  constructor() {
    console.log('Hello LeituraQrcodeComponent Component');
    this.text = 'Hello World';
  }

}
