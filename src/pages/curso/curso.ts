import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
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

  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    
    this.fetchContent();
    this.delete = 'http://localhost:8090/curso/';
    
  }

  ionViewDidLoad(){
    this.fetchContent();
  }

  fetchContent ():void {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    // setTimeout(function () {
    // },2000);

    try{
    this.http.get(this.url).map(res => res.json()).subscribe(res => {
      this.cursos = res;
      // alert( JSON.stringify( this.cursos ) );
      loading.dismiss();
      
     });
    }
    catch(err){
      alert(err);
    }
      
  }

  novo():void{
    this.navCtrl.push(CadastrarCursoPage);
  }

  detalhar( id: string){
    this.navCtrl.push(CadastrarCursoPage,{'id': id});
  } 

  excluir( id: string, i : number){

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
            
            (this.cursos).splice(i,1);
            alert('The course was removed');
            loading.dismiss();

          }
        }
      );
      // this.viewCtrl.dismiss();
      
  
  }

  // itemSelected (feed):void {
  //   alert(feed.data.url);
  // }

}
