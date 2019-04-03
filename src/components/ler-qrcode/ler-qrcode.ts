import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';

/**
 * Generated class for the LerQrcodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ler-qrcode',
  templateUrl: 'ler-qrcode.html'
})
export class LerQrcodeComponent {

  basepath = "/resumo-presenca/InsertPresenca";
  text: string;
  // store the scanned result
  num: string;
  barcodeScanner :BarcodeScanner;
  geolocation: Geolocation;


  constructor(  barcodeScanner: BarcodeScanner,  geo: Geolocation,
    public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController ) {
    console.log('Hello LerQrcodeComponent Component');
    this.barcodeScanner = barcodeScanner;
    this.geolocation = geo;
    this.basepath = "http://192.168.0.12:8090"+this.basepath;

  }

  scan() {

    var position = { "latitude":0,"longitude":0  }

    this.barcodeScanner.scan().then(data => {
        // this is called when a barcode is found
        this.num = data.text

        alert("Informação data");

        let options = {timeout: 30000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(options)
            this.geolocation.getCurrentPosition().then((resp) => {
              // resp.coords.latitude
              // resp.coords.longitude
      
              position.latitude =resp.coords.latitude ;
              position.longitude =resp.coords.longitude ;
      
              ///Gerar a informação aqui
              alert(JSON.stringify(this.num));

              var info = 
              { 
                "position":{"latitude":0,"longitude":0},
                "data":{"dia":0,"mes":0,"ano":0,"hora":0,"minutos":0},
                "turma":{"idTurma":0},
                "presenca":{"idPresenca":0}
              }

              let loading = this.loadingCtrl.create({
                content: 'Carregando...'
              });
          
              loading.present();
          
              let headers = new Headers();
              headers.append('Access-Control-Allow-Origin' , '*');
              headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
              headers.append('Accept','application/json');
              headers.append('content-type','application/json');
          

              info = JSON.parse(this.num);

              var aluno = parseInt( localStorage.getItem('id'));

              var d = new Date();
              var dia = d.getDate();
              var mes = d.getMonth() + 1;
              var ano = d.getFullYear();
              var hora = d.getHours();
              var minutos = d.getMinutes();
      
              alert("Vamos começar");
              alert(info.position.latitude);
              alert(position.latitude);
              alert(info.position.longitude);
              alert(position.longitude);
              alert("Vamos testar");

              if( info.data.dia == dia && info.data.mes == mes && info.data.ano == ano   ){

                alert("Entrou no if de data");

                  if(  info.position.latitude == position.latitude  && info.position.longitude == position.longitude  ){

                      alert("Entrou no if de posições");

                      this.http.get(this.basepath+'/'+info.presenca.idPresenca+'/'+info.turma.idTurma+"/"+aluno+'/'  ,{ headers: headers })
                      .map(
                        res => res.json()
                      )
                      .subscribe(
                        (result) => {
                            loading.dismiss();
                        }
                      );
                  }
                  else{
                    alert("Fora da área");

                  }
              }
              else{
                alert('Data vencida');
              }
            
              
              
      
            }).catch((error) => {
              console.log('Error getting location', error);
            });
      
            let watch = this.geolocation.watchPosition();
            watch.subscribe((data) => {
              // data can be a set of coordinates, or an error (if an error occurred).
              // data.coords.latitude
              // data.coords.longitude
            });

      });      
  }

}
