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
  private url: string = "http://192.168.0.12:8090/aluno/alunos";  
  delete = "/delete";

  
  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.delete = 'http://192.168.0.12:8090/aluno/';
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

  excluir( id: string, index : number){

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
            
            alert('The course was removed');
            (this.alunos).splice(index,1);
            loading.dismiss();


          }
        }
      );
      // this.viewCtrl.dismiss();
      this.Content();
  
  }




}




