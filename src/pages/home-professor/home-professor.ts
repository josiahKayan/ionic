import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { ContactPage } from '../contact/contact';
import { elementAttribute } from '@angular/core/src/render3/instructions';


@IonicPage()
@Component({
  selector: 'page-home-professor',
  templateUrl: 'home-professor.html',
})
export class HomeProfessorPage {

  id : string;
  titulo:string;
  publicacao:string;
  protected listaMensagem: any; 
  nav : NavController;
  alertCtrl: AlertController;
  loading: LoadingController;
  imgTitulo: string;
  items = [];
  modal:ModalController ;
  turmas : any;
  page = 1;
  perPage = 10;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public loadingCtrl: LoadingController
    ,alertCtrl: AlertController, modal: ModalController ) {

    this.id = navParams.get('id');

    this.modal = modal;

    this.loading = loadingCtrl;
    this.alertCtrl = alertCtrl;

    if(this.id != undefined){
      localStorage.setItem("id",this.id);
    }

    this.carregaMural();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfessorPage');
  }

  publicar(){

    let msg = new Mensagem();

    msg.Mensagem = this.publicacao;
    msg.Titulo = this.titulo;
    msg.UsuarioId = parseInt( localStorage.getItem('id') );

    let turmasSelecionadas :string;

    turmasSelecionadas = '';
    
  
    
    for (var i = 0; i < this.turmas.turmas.length; i++){
      turmasSelecionadas = turmasSelecionadas  + this.turmas.turmas[i].TurmaId +',';
  }

    var strIds = turmasSelecionadas.substring(0, turmasSelecionadas.length - 1);
    
    msg.TurmasId = strIds;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    let bas = "http://192.168.0.12:8090/publicacao/novapublicacao";


    this.http.post(bas, JSON.stringify(msg), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

        });

    this.titulo = "";
    this.publicacao = "";
  }

  carregaMural(){

    
      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      let pbpath = "http://192.168.0.12:8090/publicacao/publicacoes/professor/";
      
      this.http.get(pbpath+localStorage.getItem("id")+"/"+this.perPage+"/"+this.page  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            // this.imgTitulo = "assets/imgs/blank-profile-default.png";     
            this.listaMensagem = result;

            loading.dismiss();
          
        }
      );

      loading.dismiss();


  }

  isNulo( img : any ){

    if(img != null){
      return img;
    }
    else{
      return "assets/imgs/blank-profile-default.png";      
    }

  }

  SelecionaMes( mes:number ){
    let arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var ttt =  arrayMonth[mes-1];
    return ttt ;
  }

  SelecionarTurma() {
    let profileModal = this.modal.create(ContactPage );
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
      this.turmas = data;
    });
  }

  doInfinite(infiniteScroll) {
    
    
    setTimeout(() => {
      
      this.perPage = this.perPage + 10;
      
      this.carregaMural();

      infiniteScroll.complete();
    }, 2000);

  }


}

export class Mensagem{
  PublicacaoId: number;
  UsuarioId: number;
  HoraPublicacao: string;
  Mes: number;
  Ano: number;
  Dia: number;
  Mensagem: string;
  Titulo:string;
  UsuarioDestino:string;
  IdUnico:string;
  TurmasId:string;
}
