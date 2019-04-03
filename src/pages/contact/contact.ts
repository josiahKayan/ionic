import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController,ModalController, ViewController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  nav : NavController;
  alertCtrl: AlertController;
  loading: LoadingController;
  modal:ModalController ;
  id : string;
  private urlPerfilBase: string = "http://192.168.0.12:8090/turma/";
  public turma: Turma;
  public nome : string;
  public dataInicial: string;
  public dataFinal: string;
  public horaInicial: string;
  public horaFinal: string;
  public professorId: number;
  public cursoId: number;
  public turmaId: number; 
  turmasList : Array<Turma>;
  selected : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,public viewCtrl: ViewController) {

    this.id =localStorage.getItem('id');
    this.nav = navCtrl;

    this.carrega();
  }


  carrega(){

    if(!( this.id == undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      this.turma = new Turma();

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      let basepath = "GetTurmasPeloUsuarioId/";
      
      this.http.get(this.urlPerfilBase+basepath+this.id  ,{ headers: headers }).map(res => res.json())
      .subscribe( res => {
        this.turmasList = res;
        loading.dismiss();
      });

    }

    
  }

  dismiss(){
    console.log(this.turmasList);

    var checkeds = this.turmasList.filter( (v) =>{
        return v.selected == true  ;
    });

    let data = { 'turmas': checkeds };
    this.viewCtrl.dismiss(data);
    // this.nav.pop();
  }

  


  


  formataData(data: string){
    var tValue = data.indexOf('T')+1 ; 
    var finalLength = data.length ;

    var final = data.slice(tValue,finalLength) ;
    return final;
  }

  formataDataF(data: string){
    var tValue = data.indexOf('T')+1 ; 
    var finalLength = data.length ;

    var final = data.slice(tValue,finalLength) ;
    return final;
  }
  close(){
    this.nav.pop();  
  }

  

}


export class Turma{
  TurmaId: number;
  NomeTurma: string;
  DataInicio: string;
  DataTermino: string;
  // ProfessorId: number;
  HoraInicial: string;
  HoraFinal: string;
  selected: boolean;
  // Professor: any;
  // CursoId: number;
  // Curso: any;
  // AlunoLista: Array<any>;
  // PresencaLista: Array<any>;

}