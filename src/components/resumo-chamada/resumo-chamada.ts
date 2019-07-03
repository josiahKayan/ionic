import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {LerQrcodeComponent} from '../ler-qrcode/ler-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { GeraQrcodeComponent } from '../gera-qrcode/gera-qrcode';



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
  // qrScanner: QRScanner;
  idUser: number;
  num: string;
  barcodeScanner :BarcodeScanner;
  geolocation: Geolocation;
  http: Http;
  professor : boolean;

  naopresente:boolean;
  presente:boolean;
  mostranome:boolean;

  marca : boolean;
  gera : boolean;
  esconde : boolean;

  dia:number;
  mes:number;
  ano:number;


  cont:number;

  constructor(barcodeScanner: BarcodeScanner,public navCtrl: NavController, public navParams: NavParams, public htttp: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController
    ,  geo: Geolocation
  ) { 
    
    this.idPresenca = navParams.get('idPresenca');
    this.idTurma = navParams.get('idTurma');

    this.dia = navParams.get('dia');
    this.mes = navParams.get('mes');
    this.ano = navParams.get('ano');

    this.alertCtrl = alertCtrl;

    this.nav = navCtrl;

    this.idUser = parseInt( localStorage.getItem('id'));

    this.barcodeScanner = barcodeScanner ;

    this.geolocation = geo;

    this.http = htttp;

    this.marca = true;
    this.gera = true;
    this.esconde = false;

    this.aluno = ( localStorage.getItem('aluno') === "true" ) ? true : false;

    if(this.aluno){
        this.marca = false;
        this.esconde = true;
        this.presente = false;
        this.naopresente = false;
    }
  
    this.professor = this.aluno == true ? false : false;

    if(this.professor){
      
      this.gera = false;
      this.esconde = false;
      this.marca = true;


      this.naopresente = true;
      this.presente = true;
      this.mostranome = false;
    }
  


    this.carregaListaPresentes(this.idPresenca,this.idTurma, this.aluno);

    


  }


  verificaQr(t : number){
    if(t == 1){
      return false
    }
    else{
      return true
    }
  }

  verificaRf(t : number){
    if(t == 1){
      return false
    }
    else{
      return true
    }
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

      this.basepath = "http://192.168.0.12:8090/resumo-presenca/";
      
      if( idAluno === false  ){
        this.idUser = 0;
      }


      this.http.get(this.basepath+'/GetResumoListaPresencaByIdPresencalista/'+idPresenca+'/'+this.idUser  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {


          if(this.aluno){
            if(result.length > 0 && result[0].Aluno.AlunoId != 0 ){
              
              
              this.cont = 0 ;

              result.forEach(element => {
                  if(element.Aluno.UsuarioId == this.idUser){
                    this.cont = 1;
                    
                  }
                  
              });

              if(this.cont == 1){
                this.aluno = false;
                this.ListaPresentes = [];
                this.ListaPresentes.push(result[0]);
                this.marca = true;

                this.naopresente = true;
                this.presente = false;
              }else{
                this.cont = 0;
              }

            }
            else{
              this.naopresente = false;
              this.presente = true;
              this.mostranome = true;
            }
          }//caso seja professor
          else{
            this.ListaPresentes = result;
            this.gera = false;
            this.naopresente = true;
            this.presente = true;
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

    var position = { "latitude":0,"longitude":0  }

    this.barcodeScanner.scan().then(data => {
        // this is called when a barcode is found
        this.num = data.text

        // alert("lido do professor");

        let options = {timeout: 30000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(options)
            this.geolocation.getCurrentPosition().then((resp) => {
              // resp.coords.latitude
              // resp.coords.longitude
      
              position.latitude =resp.coords.latitude ;
              position.longitude =resp.coords.longitude ;
      
              ///Gerar a informação aqui
              // alert(this.num);

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
      
              // alert("Antes de entrar na data");

              if( info.data.dia === dia && info.data.mes === mes && info.data.ano === ano && ( info.data.hora === hora || info.data.hora === (hora + 1)  ) ){

                  // alert("Vamos testar");
                  // alert("lat lido: "+Math.floor(info.position.latitude));
                  // alert("lat meu "+Math.floor(position.latitude));
                  // alert("long lido:"+Math .floor(info.position.longitude));
                  // alert("long meu:"+Math.floor(position.longitude));
                  // alert("request");

                  if( Math.floor( info.position.latitude) == Math.floor( position.latitude)  && Math.floor( info.position.longitude) == Math.floor( position.longitude )  ){
                  
                      this.http.get(this.basepath+"/InsertPresenca"+'/'+info.presenca.idPresenca+'/'+info.turma.idTurma+"/"+aluno+'/'  ,{ headers: headers })
                      .map(
                        res => res.json()
                      )
                      .subscribe(
                        (result) => {
                            loading.dismiss();
                            if(  result === "OK"  ){
                              

                              let alert = this.alertCtrl.create({
                                title: 'Sucesso',
                                subTitle: 'Frequência cadastrada com sucesso!!',
                                buttons: ['Ok']
                              });
                              alert.present();

                              this.navCtrl.pop();
                            }          
                        }
                      );
                    }
                    else{
                      let alert = this.alertCtrl.create({
                        title: 'Erro',
                        subTitle: 'Houve algum problema com a sua localização!',
                        buttons: ['Ok']
                      });
                      alert.present();
                      loading.dismiss();
      
                    }
        
                }
              
              else{
                let alert = this.alertCtrl.create({
                  title: 'Erro',
                  subTitle: 'Fora da data chamada!',
                  buttons: ['Ok']
                });
                alert.present();
                loading.dismiss();

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

      this.basepath = "http://192.168.0.12:8090/resumo-presenca/";
      
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


  geraQRCode(){
    this.nav.push(GeraQrcodeComponent, {   idTurma: this.idTurma, idPresenca: this.idPresenca,dia:this.dia,mes:this.mes,ano:this.ano} );    
  }


}
