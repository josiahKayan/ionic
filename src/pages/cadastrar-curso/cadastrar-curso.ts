import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import {CursoPage} from '../curso/curso';
import 'rxjs/add/operator/map';

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


  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
      this.basepath = "http://localhost:8090/curso/addcurso";
  // this.adicionarCurso();
  }

  salvarCurso() {
    this.curso = new Curso();
    this.curso.nome = this.nome;
    this.curso.descricao = this.descricao;
    this.curso.ativo = this.ativo;

    alert(JSON.stringify(this.curso));

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
            this.navCtrl.push(CursoPage);
          }
        }
      );

  }

  
}

export class Curso {
  cursoId: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}