import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
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
  geolocation: Geolocation;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController,
    private geo: Geolocation) {
    
    this.idTurma = navParams.get('idTurma');
    
    this.geolocation = geo;

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;
    
    var position = { "latitude":0,"longitude":0  }

    let options = {timeout: 10000, enableHighAccuracy: true};
  this.geolocation.getCurrentPosition(options)
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude

        position.latitude =resp.coords.latitude ;
        position.longitude =resp.coords.longitude ;

        ///Gerar a informação aqui
        // this.qrData = "Jesus Vive";
        this.qrData = ""+position.latitude + ";"+position.longitude+";"+this.idTurma;


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
 
  createCode() {
    // this.createdCode = this.qrData;

//     const subscription = this.geolocation.watchPosition()
//                               .filter((p) => p.coords !== undefined) //Filter Out Errors
//                               .subscribe(position => {
//   console.log(position.coords.longitude + ' ' + position.coords.latitude);
// });

// // To stop notifications
// subscription.unsubscribe();

  }

  
   
   


}
