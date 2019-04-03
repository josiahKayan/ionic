import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { ListaChamadaComponent } from '../../components/lista-chamada/lista-chamada';
import { dateSortValue } from 'ionic-angular/umd/util/datetime-util';

/**
 * Generated class for the TurmasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html',
})
export class TurmasPage {

  private urlPerfilBase: string = "http://192.168.0.12:8090/turma/";
  id : string ;
  nav : NavController;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {

    this.id =localStorage.getItem('id');
    this.nav = navCtrl;

    this.carrega();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TurmasPage');
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

  abreLista(idTurma : number){


      this.nav.push(ListaChamadaComponent, { id : idTurma} );
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

}


export class Turma{
  TurmaId: number;
  NomeTurma: string;
  DataInicio: string;
  DataTermino: string;
  // ProfessorId: number;
  HoraInicial: string;
  HoraFinal: string;
  // Professor: any;
  // CursoId: number;
  // Curso: any;
  // AlunoLista: Array<any>;
  // PresencaLista: Array<any>;

}