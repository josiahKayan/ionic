import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

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

  idPresenca: number;
  idTurma: number;
  basepath : string ;
  ListaPresentes: Array<any>;
  listaFaltosos: Array<any>;
  alertCtrl: AlertController;
  aluno : boolean;
  nav: NavController;
  qrScanner: QRScanner;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController, qr: QRScanner) {
    
    console.log('AQUI');

    this.idPresenca = navParams.get('idPresenca');
    this.idTurma = navParams.get('idTurma');
    this.alertCtrl = alertCtrl;

    this.nav = navCtrl;
    
    this.qrScanner = qr;

    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
    
  }

  

}
