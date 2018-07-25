import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { CadastrarTagPage } from '../cadastrar-tag/cadastrar-tag';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage {

  public tags: Array<Tag>;
  private url: string = "http://localhost:8090/tag/tags";  
  delete = "/delete";

  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.delete = 'http://localhost:8090/tag/';
    this.Content();
  }

  Content(): void {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    try {
      this.http.get(this.url).map(res => res.json()).subscribe(res => {
        this.tags = res;
        //alert(JSON.stringify(this.tags));
        loading.dismiss();
      });
    }
    catch (err) {
      alert(err);
    }

  }

  novo():void{
    this.navCtrl.push(CadastrarTagPage);
  }

  detalhar( id: string){
    this.navCtrl.push(CadastrarTagPage,{'id': id});
  } 

  excluir( tag: Tag, id : string){

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
            let index = this.tags.indexOf(tag);
          
              if(index > -1){
                this.tags.splice(index, 1);
                alert('The tag was removed');
                
              }
          }
        }
      );
      // this.viewCtrl.dismiss();
      this.Content();
  
  }


}



export class Tag {
  tagId: string;
  code: string;
  status: boolean;
  
}