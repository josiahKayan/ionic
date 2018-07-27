import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import {ProfessorPage} from '../professor/professor';
import { ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UsuarioPage } from '../usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-cadastrar-professor',
  templateUrl: 'cadastrar-professor.html',
})
export class CadastrarProfessorPage {
  basepath = "/addprofessor";

  public professorId: string;
  public nome: string;
  public nomeCompleto: string;
  public imagem: string;
  public dataNascimento : string ;
  public idade : number;
  public id : string ;
  public save:boolean;
  public edit:boolean;
  public professor: Professor;
  public login : string ;
  public password : string ;
  public confirm : string ;



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController
  ,public modalCtrl: ModalController) {
      this.basepath = "http://localhost:8090/professor/addprofessor";
      this.save = false;
      this.edit = true;
      this.id = navParams.get('id');
      this.login = this.navParams.get('email');
      this.password = this.navParams.get('password');
      this.confirm = this.navParams.get('confirm');

      this.carrega();
      
      
  }

  logIn() {
    let profileModal = this.modalCtrl.create(UsuarioPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  salvarCurso() {
    this.professor = new Professor();
    this.professor.nome = this.nome ;
    this.professor.nomeCompleto = this.nomeCompleto;
    this.professor.imagem = this.imagem;
    this.professor.dataNascimento = this.dataNascimento;
    this.professor.idade = this.idade;
    this.professor.usuario = new Usuario();
    this.professor.usuario.email = this.login;
    this.professor.usuario.senha = this.password;

    this.professor.usuario.perfil = 1;

    if( this.password != this.confirm ){
      alert('As senhas não conferem');
      
    }
    else{


    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath, JSON.stringify(this.professor), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            loading.dismiss();
            this.navCtrl.push(ProfessorPage);
          }
        }
      );
      // location.reload();
      this.navCtrl.push(ProfessorPage);
    }
      
  }

  

  carrega() {

    if(!(this.id == "" || this.id == undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      this.professor = new Professor();
      this.professor.nome = this.nome ;
      this.professor.nomeCompleto = this.nomeCompleto;
      this.professor.imagem = this.imagem;
      this.professor.dataNascimento = this.dataNascimento;
      this.professor.idade = this.idade;
      this.professor.professorId = ""+ this.id;
      

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.basepath = "http://localhost:8090/professor/";
      
      this.http.get(this.basepath+'/'+this.id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            var objProf = {"ProfessorId":"","Nome":"","NomeCompleto":"","Imagem":"","DataNascimento":"","Idade":0};
            objProf = result;
            
            this.nome = objProf.Nome ;
            this.nomeCompleto = objProf.NomeCompleto;
            this.imagem = objProf.Imagem;
            this.dataNascimento = objProf.DataNascimento;
            this.idade = objProf.Idade;
            this.professorId = objProf.ProfessorId;

            this.save = true;
            this.edit = false;
            loading.dismiss();
          
        }
      );

    }
    
  }

  editarCurso( id: string){
    

    this.professor = new Professor();
    this.professor.nome = this.nome ;
    this.professor.nomeCompleto = this.nomeCompleto;
    this.professor.imagem = this.imagem;
    this.professor.dataNascimento = this.dataNascimento;
    this.professor.idade = this.idade;

    this.basepath = "http://localhost:8090/professor/update/";
    this.save = false;
    this.edit = true;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath+id, JSON.stringify(this.professor), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          this.navCtrl.push(ProfessorPage);    
        }
      );
      // location.reload();
      this.navCtrl.push(ProfessorPage);
  }
  
}


export class Professor {
  professorId: string;
  nome: string;
  nomeCompleto: string;
  imagem: string;
  dataNascimento : string ;
  idade : number;
  usuario : Usuario;
}

export class Usuario{
  usuarioId: string;
  email: string;
  senha: string;
  perfil: number;
}

