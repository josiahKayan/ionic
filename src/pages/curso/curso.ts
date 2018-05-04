import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http,HttpModule } from '@angular/http';
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
  public cursos : Array<any>;
  private url: string = "http://localhost:8090/curso/cursos";  

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.fetchContent();
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

  // itemSelected (feed):void {
  //   alert(feed.data.url);
  // }

}
