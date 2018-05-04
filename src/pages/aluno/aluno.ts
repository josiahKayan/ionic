import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http';
import { CadastrarAlunoPage } from '../cadastrar-aluno/cadastrar-aluno';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {
  basepath = "/alunos";
  public alunos: Array<any>;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.basepath = "http://localhost:8090/aluno/alunos";
    this.Content();
  }

  Content(): void {

    try {
      this.http.get(this.basepath).map(res => res.json()).subscribe(res => {
        this.alunos = res;
        // alert(JSON.stringify(this.alunos));
      });
    }
    catch (err) {
      alert(err);
    }

  }

  novo():void{
    alert('Novo');
    this.navCtrl.push(CadastrarAlunoPage);
  }

}




