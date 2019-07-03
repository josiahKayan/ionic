import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { ResumoChamadaComponent } from '../resumo-chamada/resumo-chamada';
import { convertToView } from 'ionic-angular/umd/navigation/nav-util';
import { GeralComponent } from '../geral/geral';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


/**
 * Generated class for the ListaChamadaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lista-chamada',
  templateUrl: 'lista-chamada.html'
})
export class ListaChamadaComponent {

  text: string;
  idTurma : number ;
  private basepath: string;
  nav : NavController;
  alertCtrl: AlertController;
  aluno : boolean;
  push: Push;
  
  protected listaPresenca: Array<any>; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController, p : Push) {

    this.idTurma = navParams.get('id');

    this.aluno = ( localStorage.getItem('aluno') == "true" ) ? true : false;
     
    
    this.carregaListaTurma();

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;

    this.push = p;
    
  //   platform.ready().then(() => {

  //     if (platform.is('android')) {
  //         console.log("running on Android device!");
  
    let isApp = false ;

    isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));

    if(isApp){
      // alert('app');
      this.setupNotifications();
    }

  //     }
  //     if (platform.is('ios')) {
  //         console.log("running on iOS device!");
  //     }
  //     if (platform.is('mobileweb')) {
  //         console.log("running in a browser on mobile!");
  //     }

  // });
   
  }


  carregaListaTurma(){

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

      this.basepath = "http://192.168.0.12:8090/lista-presenca/";
      
      this.http.get(this.basepath+'/GetListasPresencaByIdTurma/'+this.idTurma  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            var objCurso = [{"ListaPresencaId":"","HoraEntrada":"","Mes":"","Ano":"","Dia":"","Ativo":false,"TurmaId":""}];
            objCurso = result;
            
            this.listaPresenca = objCurso;

            loading.dismiss();
          
        }
      );

    }

  }

  relatorio(){
    
  }

  abrirGeral(){
    this.nav.push(GeralComponent, { id: this.idTurma} );

  }

  abreListaChamada(idPresenca : number,dia:number ,mes:number,ano:number){

    this.nav.push(ResumoChamadaComponent, { idPresenca : idPresenca,  idTurma: this.idTurma,dia:dia,mes:mes,ano:ano} );
}

  


  calculaDia(dia:number,mes:number,ano:number){
    var d = new Date(mes+'-'+dia+'-'+ano);
    var n = d.getDay() - 1;
    let arrayWeek = ['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado','domingo'];
    var ttt =  arrayWeek[n];
    return ttt ;
  }

  calculaMes( mes:number ){
    let arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var ttt =  arrayMonth[mes-1];
    return ttt ;
  }

  

  confirmNewList() {
    const confirm = this.alertCtrl.create({
      title: 'Nova Lista',
      message: 'Deseja criar uma nova lista?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Agree clicked');
      
            let headers = new Headers();
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            headers.append('Accept','application/json');
            headers.append('content-type','application/json');

            this.basepath = "http://192.168.0.12:8090/lista-presenca/insertListaPresenca/";

            this.http.post(this.basepath+this.idTurma, { headers: headers })
              .map(
                res => res.json()
              )
              .subscribe(
                (result) => {


                    //Notificação por ter criado uma nova lista de presença

                    
                  
                        this.nav.push(ListaChamadaComponent, { id : this.idTurma} );


                }
              );


          }
        }
      ]
    });
    confirm.present();
  }


  setupNotifications(){

      // to check if we have permission
      this.push.hasPermission()
      .then((res: any) => {
          if (res.isEnabled) {
            // alert('We have permission to send push notifications');

            const options: PushOptions = {
                android: {},
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
                windows: {},
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                }
            }

            const pushObject: PushObject = this.push.init(options);

            pushObject.on('notification').subscribe((notification: any) => 
            {
                // alert(notification.message);

                let alert = this.alertCtrl.create({
                  title: 'Notificação',
                  subTitle: ''+notification.message,
                  buttons: ['Ok']
                });
                alert.present();

            });

            pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

            pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

          } else {
            let alert = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Você não tem permissão!',
              buttons: ['Ok']
            });
            alert.present();
          }
      });
  
  }
}



export class PresencaLista{

  ListaPresencaId: number;
  HoraEntrada : string ;
  Mes: number;
  Ano: number;
  Dia: number;
  Ativo: boolean;
  TurmaId : number;

}