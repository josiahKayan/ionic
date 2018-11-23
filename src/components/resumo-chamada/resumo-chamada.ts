import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) { 
    
    this.idPresenca = navParams.get('idPresenca');
    this.idTurma = navParams.get('idTurma');
    this.alertCtrl = alertCtrl;

    this.carregaListaPresentes(this.idPresenca,this.idTurma);


  }


  carregaListaPresentes(idPresenca :number,idTurma:number){

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
      
      this.http.get(this.basepath+'/GetResumoListaPresencaByIdPresencalista/'+idPresenca  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

          this.ListaPresentes = result;
          this.carregaListaFaltosos(idTurma,idPresenca);

          loading.dismiss();
          
        }
      );

    }

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
