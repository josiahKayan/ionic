import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { CadastrarCursoPage } from '../../pages/cadastrar-curso/cadastrar-curso';
import { CursoPage } from '../../pages/curso/curso';
/**
 * Generated class for the TurmasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'turmas',
  templateUrl: 'turmas.html'
})
export class TurmasComponent {

  text: string;
  nav : NavController;
  public professores: Array<any>;
  private url: string = "http://localhost:8090/professor/professores";
  private urlTurma: string = "http://localhost:8090/turma/addturma";

  public turma: Turma; 
  public nome : string;
  public dataInicial: string;
  public dataFinal: string;
  public horaInicial: string;
  public horaFinal: string;
  public professorId: number;
  public cursoId: number;
  public turmaId: number;
  public save :boolean;
  public edit :boolean;
  public selectedProfesor: number;

  constructor(public navCtrl: NavController, public http: Http, public params: NavParams, public loadingCtrl: LoadingController,){
    this.nav = navCtrl;
    this.cursoId = params.get('cursoId');

    this.turmaId = params.get('turmaId');
    this.professorId = params.get('pfId');

    this.selectedProfesor = this.professorId;    

    if(this.turmaId != undefined ){
      this.carrega();
      this.save = true;
      this.edit = false;
       
    }
    else{
      this.save = false;
      this.edit = true;
    }

  }

  ionViewDidLoad(){

    this.listarProfessores();
      

  } 

  carrega(){
    if(!( this.turmaId == undefined)){

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

      let basepath = "http://localhost:8090/turma/";
      
      this.http.get(basepath+this.turmaId  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
            
          this.nome = result.NomeTurma ;
          this.dataInicial = result.DataInicio ;
          this.dataFinal = result.DataTermino ;
          this.horaInicial = result.HoraInicial ;
          this.horaFinal = result.HoraFinal;

          loading.dismiss();
          
        }
      );

    }
    
  }


  editarTurma( id: string){
    
    console.log(id);

    this.turma = new Turma();
    this.turma.NomeTurma = this.nome;
    this.turma.DataInicio = this.dataInicial;
    this.turma.DataTermino = this.dataFinal;
    this.turma.HoraInicial = this.horaInicial;
    this.turma.HoraFinal = this.horaFinal;
    this.turma.ProfessorId = this.professorId;
    this.turma.CursoId = this.cursoId;

    var urlTurmaUpdate = "http://localhost:8090/turma/update/";
    this.save = false;
    this.edit = true;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(urlTurmaUpdate+id, JSON.stringify(this.turma), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          this.navCtrl.push(CursoPage);    
        }
      );
      // location.reload();
      this.navCtrl.push(CursoPage);
  }

  onSelectChange(selectedValue: any) {
    console.log(JSON.stringify(selectedValue));
    this.text = selectedValue.NomeCompleto;
    this.professorId = selectedValue.ProfessorId;

  }

  dismiss() {
    this.navCtrl.pop();
  }
 

  salvarNovaTurma(){
    this.turma = new Turma();
    this.turma.NomeTurma = this.nome;
    this.turma.DataInicio = this.dataInicial;
    this.turma.DataTermino = this.dataFinal;
    this.turma.HoraInicial = this.horaInicial;
    this.turma.HoraFinal = this.horaFinal;
    this.turma.ProfessorId = this.professorId;
    this.turma.CursoId = this.cursoId;

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.urlTurma, JSON.stringify(this.turma), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            console.log(JSON.stringify(result));
            loading.dismiss();
            this.navCtrl.pop();
            this.nav.push(CursoPage);
            
          }
        }
      );

  }

  listarProfessores(): void {

    
    try {
      this.http.get(this.url).map(res => res.json()).subscribe(res => {
        this.professores = res;
        


      });
    }
    catch (err) {
      alert(err);
    }

  }

}

export class Turma{
  TurmaId: number;
  NomeTurma: string;
  DataInicio: string;
  DataTermino: string;
  ProfessorId: number;
  HoraInicial: string;
  HoraFinal: string;
  Professor: any;
  CursoId: number;
  Curso: any;
  AlunoLista: Array<any>;
  PresencaLista: Array<any>;

}
