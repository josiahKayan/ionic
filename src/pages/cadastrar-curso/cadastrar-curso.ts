import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import {CursoPage} from '../curso/curso';
import 'rxjs/add/operator/map';
import { TurmasComponent } from '../../components/turmas/turmas';

@IonicPage()
@Component({
  selector: 'page-cadastrar-curso',
  templateUrl: 'cadastrar-curso.html',
})

export class CadastrarCursoPage {
  basepath = "/addcurso";

  public curso: Curso;
  nome: string;
  descricao: string;
  ativo:boolean;
  id : string ;
  public save:boolean;
  public edit:boolean;
  public cursoId:string;
  modal:ModalController ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, modal: ModalController) {
      this.basepath = "http://localhost:8090/curso/addcurso";
      this.save = false;
      this.edit = true;
      this.id = navParams.get('id');
      this.carrega();
      this.modal = modal;
  }

  novaTurma(){
    this.presentTurmaModal();
  }

  presentTurmaModal() {
    let turmaModal = this.modal.create(TurmasComponent);
    turmaModal.present();
  }

  salvarCurso() {
    this.curso = new Curso();
    this.curso.nome = this.nome;
    this.curso.descricao = this.descricao;
    this.curso.ativo = this.ativo;

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath, JSON.stringify(this.curso), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            loading.dismiss();
            this.navCtrl.push(CursoPage);
          }
        }
      );
      // location.reload();
      this.navCtrl.push(CursoPage);
      
  }

  carrega() {

    

    if(!(this.id == "" || this.id == undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      this.curso = new Curso();
      this.curso.nome = this.nome;
      this.curso.descricao = this.descricao;
      this.curso.ativo = this.ativo;

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://localhost:8090/curso/";
      
      this.http.get(this.basepath+'/'+this.id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            var objCurso = {"CursoId":"","Nome":"","Descricao":"","Ativo":false,"ProfessorLista":[]};
            objCurso = result;
            
            this.nome = objCurso.Nome;
            this.descricao = objCurso.Descricao;
            this.ativo = objCurso.Ativo;
            this.cursoId = objCurso.CursoId;
            this.save = true;
            this.edit = false;
            loading.dismiss();
          
        }
      );

    }
    
  }

  editarCurso( id: string){
    
    this.curso = new Curso();
    this.curso.nome = this.nome;
    this.curso.descricao = this.descricao;
    this.curso.ativo = this.ativo;

    this.basepath = "http://localhost:8090/curso/update/";
    this.save = false;
    this.edit = true;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath+id, JSON.stringify(this.curso), { headers: headers })
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
  
}

export class Curso {
  cursoId: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}