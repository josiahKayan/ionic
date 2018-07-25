import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { CadastrarAlunoPage } from '../cadastrar-aluno/cadastrar-aluno';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {
  
  public alunos: Array<any>;
  private url: string = "http://localhost:8090/aluno/alunos";  
  delete = "/delete";

  
  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.delete = 'http://localhost:8090/aluno/';
    this.Content();
  }

  Content(): void {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    try {
       this.http.get(this.url).map(res => res.json()).subscribe(res => {
        this.alunos = res;
        // alert(JSON.stringify(this.alunos));
        loading.dismiss();
        
      });
    }
    catch (err) {
      alert(err);
    }

  }

  novo():void{
    this.navCtrl.push(CadastrarAlunoPage);
  }

  detalhar( id: string){
    this.navCtrl.push(CadastrarAlunoPage,{'id': id});
  } 

  excluir( id: string){

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE,PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.get(this.delete+'delete/'+id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            loading.dismiss();
            alert('The course was removed');
          }
        }
      );
      // this.viewCtrl.dismiss();
      this.Content();
  
  }




}




