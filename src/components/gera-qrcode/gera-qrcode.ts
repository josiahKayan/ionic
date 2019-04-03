import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeComponent  } from 'ngx-qrcode2';


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

  barcodeScanner :BarcodeScanner;

  idTurma : number ;
  idPresenca: number;
  private basepath: string;
  nav : NavController;
  alertCtrl: AlertController;

  public qrData: string = null;
  createdCode = null;
  
  geolocation: Geolocation;
  encodedData: string;

  dia:number;
  mes:number;
  ano:number;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController,
    private geo: Geolocation,barcodeScanner: BarcodeScanner) {
    
    this.idTurma = navParams.get('idTurma');
    
    this.idPresenca = navParams.get('idPresenca');

    this.dia = navParams.get('dia');
    this.mes = navParams.get('mes');
    this.ano = navParams.get('ano');

    this.geolocation = geo;

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;
    this.barcodeScanner = barcodeScanner;

    
    var info = 
    { 
      "position":{"latitude":0,"longitude":0},
      "data":{"dia":0,"mes":0,"ano":0,"hora":0,"minutos":0},
      "turma":{"idTurma":0},
      "presenca":{"idPresenca":0}
    }

    let options = {timeout: 30000, enableHighAccuracy: true};
  this.geolocation.getCurrentPosition(options)
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude

        info.position.latitude = resp.coords.latitude ;
        info.position.longitude = resp.coords.longitude ;
        
        var d = new Date();

        info.data.dia = this.dia;
        info.data.mes = this.mes;
        info.data.ano = this.ano;
        info.data.hora = d.getHours();
        info.data.minutos = d.getMinutes();

        info.turma.idTurma = this.idTurma;

        info.presenca.idPresenca = this.idPresenca;

        ///Gerar a informação aqui
        this.createdCode =  JSON.stringify(info) ;
        
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });
  }
  

}
