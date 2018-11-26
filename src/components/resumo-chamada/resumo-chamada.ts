import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { LeituraQrcodeComponent } from '../leitura-qrcode/leitura-qrcode';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the ResumoChamadaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resumo-chamada',
  templateUrl: 'resumo-chamada.html'
})
export class ResumoChamadaComponent {

  idPresenca: number;
  idTurma: number;
  basepath : string ;
  ListaPresentes: Array<any>;
  listaFaltosos: Array<any>;
  alertCtrl: AlertController;
  aluno : boolean;
  nav: NavController;
  qrScanner: QRScanner;
  idUser: number;
  geolocation: Geolocation;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController, qr: QRScanner,private geo: Geolocation) { 
    
    this.idPresenca = navParams.get('idPresenca');
    this.idTurma = navParams.get('idTurma');
    this.alertCtrl = alertCtrl;

    this.nav = navCtrl;

    this.idUser = parseInt( localStorage.getItem('id'));


    this.aluno = ( localStorage.getItem('aluno') == "true" ) ? true : false;
    

    this.carregaListaPresentes(this.idPresenca,this.idTurma, this.aluno);

    this.geolocation = geo;

    this.qrScanner = qr;



  }


  carregaListaPresentes(idPresenca :number,idTurma:number, idAluno:boolean){

    if((this.idPresenca != 0 || this.idPresenca != undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://localhost:8090/resumo-presenca/";
      
      let idUser =localStorage.getItem('id');


      this.http.get(this.basepath+'/GetResumoListaPresencaByIdPresencalista/'+idPresenca+'/'+idUser  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

          if(result[0] != null){
            this.ListaPresentes = result;
          }


          if(!idAluno){

            this.carregaListaFaltosos(idTurma,idPresenca);
          }

          loading.dismiss();
          
        }
      );

    }

  }
  marcar(){

    alert(this.idPresenca);
    alert(this.idTurma);
    alert(this.idUser);

    

    // this.nav.push(LeituraQrcodeComponent, {   idTurma: this.idTurma, idPresenca: this.idPresenca } );

    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

          alert("Texto lido "+text);

          alert('Ativando GPS');

          var position = { "latitude":0,"longitude":0  }

          let options = {timeout: 10000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(options)
            this.geolocation.getCurrentPosition().then((resp) => {
              // resp.coords.latitude
              // resp.coords.longitude

              alert('Entrou no método do GPS');

              // position.latitude =resp.coords.latitude ;
              // position.longitude =resp.coords.longitude ;

              ///Gerar a informação aqui
              // this.qrData = ""+position.latitude + ";"+position.longitude+";"+this.idTurma;

              let loading = this.loadingCtrl.create({
                content: 'Carregando...'
              });
          
              loading.present();
          
              let headers = new Headers();
              headers.append('Access-Control-Allow-Origin' , '*');
              headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
              headers.append('Accept','application/json');
              headers.append('content-type','application/json');
          
              this.basepath = "http://localhost:8090/resumo-presenca/InsertPresenca/"+this.idPresenca+"/"+this.idTurma+"/"+this.idUser+"";

              this.http.post(this.basepath, JSON.stringify(this.aluno), { headers: headers })
                .map(
                  res => res.json()
                )
                .subscribe(
                  (result) => {
                    // if(result.indexOf('OK')){
                      loading.dismiss();
                      
                      //Redirecionar para a lista de presenças

                    // }
                  }
                );

              //Adicionar a presença aqui

            }).catch((error) => {
              console.log('Error getting location', error);
            });

            let watch = this.geolocation.watchPosition();
            watch.subscribe((data) => {
              // data can be a set of coordinates, or an error (if an error occurred).
              // data.coords.latitude
              // data.coords.longitude
            });



         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {

        alert('status denied');
        alert(status.denied);

       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
        alert('permission denied');

       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
    



  }

  carregaListaFaltosos(idTurma : number, idPresenca: number){

    if((this.idTurma != 0 || this.idTurma != undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://localhost:8090/resumo-presenca/";
      
      this.http.get(this.basepath+'/GetResumoListaFaltosos/'+idPresenca+'/'  +idTurma  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (r) => {

          this.listaFaltosos = r;

          loading.dismiss();
          
        }
      );

    }

  }


  


}
