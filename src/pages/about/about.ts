import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  presencaData : any;
  lPresencaDia : any;
  lDatas : any ;
  navCt: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.presencaData = navParams.data;

    this.lDatas = this.presencaData.listaDatas;

    this.presencaData = this.presencaData.p;

    this.lPresencaDia = this.presencaData.ListaPresencaDia;

    console.log('Teste');

    this.navCt = navCtrl;

  }


  close(){
    this.navCt.pop();  
  }

}
