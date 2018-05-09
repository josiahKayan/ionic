import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http,HttpModule,Headers } from '@angular/http';
import { CadastrarCursoPage } from '../cadastrar-curso/cadastrar-curso';
import 'rxjs/add/operator/map';

export class Curso{
  Ativo: boolean;
  CursoId: number;
  Descricao: string;
  Nome: string;
  ProfessorLista:Array<any>;
}

@Component({
  selector: 'page-curso',
  templateUrl: 'curso.html',
})
export class CursoPage {
  
  curso: Curso ;
  delete = "/delete";
  
  public cursos : Array<any>;
  private url: string = "http://localhost:8090/curso/cursos";  

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.fetchContent();
    this.delete = 'http://localhost:8090/curso/';
  }

  fetchContent ():void {
    // let loading = this.loadingCtrl.create({
    //   content: 'Fetching content...'
    // });

    // loading.present();

    try{
    this.http.get(this.url).map(res => res.json()).subscribe(res => {
      this.cursos = res;
      // alert( JSON.stringify( this.cursos ) );
     });
    }
    catch(err){
      alert(err);
    }
      
  }

  novo():void{
    alert('Novo');
    this.navCtrl.push(CadastrarCursoPage);
  }

  detalhar( id: string){
    alert('The number is '+id);
  } 

  excluir( id: string){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE,PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.delete(this.delete+'delete/'+id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            alert('The course was removed');
            this.navCtrl.push(CursoPage);
          }
        }
      );

  
  }

  // itemSelected (feed):void {
  //   alert(feed.data.url);
  // }

}
