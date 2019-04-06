import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TurmaAlunoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'turma-aluno',
  templateUrl: 'turma-aluno.html'
})
export class TurmaAlunoComponent {

  public alunos: Array<any>;
  private url: string = "http://192.168.0.12:8090/aluno/alunos/peloid/";  
  alertC: AlertController;
  idTurma : number 

  constructor(public viewCtrl: ViewController,public navParams: NavParams,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {
    this.alertC = alertCtrl;
    
    this.idTurma = navParams.get('turmaId');


    this.listaAlunos();
  }

  listaAlunos() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    try {
       this.http.get(this.url+this.idTurma).map(res => res.json()).subscribe(res => {
        this.alunos = res;
        // alert(JSON.stringify(this.alunos));
        loading.dismiss();
        
      });
    }
    catch (err) {
      alert(err);
    }

  }

  addAlunos(){
    var alunosCheckeds = this.alunos.filter( (v) =>{
      return v.Selected == true  ;
    });

    //Request de saveS
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    let urlBase = "http://192.168.0.12:8090/aluno/update-aluno-turma/"

    this.http.post(urlBase+this.idTurma, JSON.stringify(alunosCheckeds), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          alert("Alunos adicionados nas turmas");
        });


  }

  close(){
    this.navCtrl.pop();  
  }

}
