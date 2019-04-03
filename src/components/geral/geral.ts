import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController  } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { AboutPage } from '../../pages/about/about';

// const word = data.name;

/**
 * Generated class for the GeralComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'geral',
  templateUrl: 'geral.html'
})
export class GeralComponent {

  text: string;
  nav : NavController;
  alertCtrl: AlertController;
  idTurma : number ;
  private basepath: string;
  mockedList : any;
  presencaList : any;
  listaDatas : string[] ;
  grid: boolean;
  modalCtrl: ModalController;
  aluno :boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController,
    public mdlCtrl: ModalController) {
    console.log('Hello GeralComponent Component');
    this.text = 'Hello World';

    this.idTurma = navParams.get('id');

    this.nav = navCtrl;

    this.alertCtrl = alertCtrl;

    this.aluno = ( localStorage.getItem('aluno') == "true" ) ? true : false;
    
    if(this.aluno){
      this.carregaListaGeralAluno();
    }
    else{
      this.carregaListaGeral();
    }

    this.grid = true;

    this.modalCtrl = mdlCtrl;

  }

  carregaListaGeralAluno(){

    if((this.idTurma != 0 || this.idTurma != undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      // loading.present();

  

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://192.168.0.12:8090/resumo-presenca/";
      
      this.http.get(this.basepath+'/getGeneralList/'+this.idTurma+'/'+localStorage.getItem('id')  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

          console.log(result);

          this.presencaList = result.FrequenciaAlunos;

          this.listaDatas = result.Datas;

          loading.dismiss();
          
        }
      );

    }

  }

  carregaListaGeral(){

    if((this.idTurma != 0 || this.idTurma != undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      // loading.present();

  

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://192.168.0.12:8090/resumo-presenca/";
      
      this.http.get(this.basepath+'/getGeneralList/'+this.idTurma  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

          console.log(result);

          this.presencaList = result.FrequenciaAlunos;

          this.listaDatas = result.Datas;

          loading.dismiss();
          
        }
      );

    }

  }

  abreModal(p: any){

    p = { "p": p , "listaDatas" : this.listaDatas };

    let profileModal = this.modalCtrl.create(AboutPage, p );
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  isNulo( img : any ){

    if(img != null){
      return img;
    }
    else{
      return "assets/imgs/blank-profile-default.png";      
    }

  }

  showList(){

    this.grid = true;

  }

  showGrid(){

    this.grid = false;


  }

}
