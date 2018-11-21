import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { ResumoChamadaComponent } from '../resumo-chamada/resumo-chamada';

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

  
  protected listaPresenca: Array<any>; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {

    this.idTurma = navParams.get('id');
    
    this.carregaListaTurma();

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;
   
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

      this.basepath = "http://localhost:8090/lista-presenca/";
      
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


  abreListaChamada(idPresenca : number){

    this.nav.push(ResumoChamadaComponent, { idPresenca : idPresenca,  idTurma: this.idTurma} );
}


  calculaDia(dia:number,mes:number,ano:number){
    var d = new Date(mes+'-'+dia+'-'+ano);
    var n = d.getDay();
    let arrayWeek = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
    var ttt =  arrayWeek[n];
    return ttt ;
  }

  calculaMes( mes:number ){
    let arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var ttt =  arrayMonth[mes];
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
      
            // let headers = new Headers();
            // headers.append('Access-Control-Allow-Origin' , '*');
            // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            // headers.append('Accept','application/json');
            // headers.append('content-type','application/json');

            // this.http.post(this.basepath, JSON.stringify(usuario), { headers: headers })
            //   .map(
            //     res => res.json()
            //   )


          }
        }
      ]
    });
    confirm.present();
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