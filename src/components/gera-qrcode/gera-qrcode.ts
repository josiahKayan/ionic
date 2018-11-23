import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';

/**
 * Generated class for the GeraQrcodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gera-qrcode',
  templateUrl: 'gera-qrcode.html'
})
export class GeraQrcodeComponent {

  idTurma : number ;
  private basepath: string;
  nav : NavController;
  alertCtrl: AlertController;
  public qrData: string = null;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {
    
    this.idTurma = navParams.get('id');
    

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;
    
    this.qrData = 'Jesus VIVE e todo joelho se dobrará';

   }
 
  createCode() {
    // this.createdCode = this.qrData;
  }




}
