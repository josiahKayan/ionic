import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import {TagPage} from '../tag/tag';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-cadastrar-tag',
  templateUrl: 'cadastrar-tag.html',
})
export class CadastrarTagPage {
  basepath = "/addtag";

  public tagId: string;
  public code: string;
  public status: boolean;
  public id : string ;
  public save:boolean;
  public edit:boolean;
  public tag: Tag;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.basepath = "http://192.168.0.12:8090/tag/addtag";
    this.save = false;
    this.edit = true;
    this.id = navParams.get('id');
    this.carrega();
    
    
}

salvarCurso() {
  this.tag = new Tag();
  this.tag.code = this.code ;
  this.tag.status = this.status == true ? 1 : 0;
  
  let loading = this.loadingCtrl.create({
    content: 'Carregando...'
  });

  loading.present();

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  headers.append('Accept','application/json');
  headers.append('content-type','application/json');

  this.http.post(this.basepath, JSON.stringify(this.tag), { headers: headers })
    .map(
      res => res.json()
    )
    .subscribe(
      (result) => {
        if(result.indexOf('OK')){
          loading.dismiss();
          this.navCtrl.push(TagPage);
        }
      }
    );
    // location.reload();
    this.navCtrl.push(TagPage);
    
}

ionViewDidLeave(){
  this.navCtrl.push(TagPage);
}


carrega() {

  if(!(this.id == "" || this.id == undefined)){

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.tag = new Tag();
    this.tag.code = this.code ;
    this.tag.status = this.status == true ? 1 : 0;
    this.tag.tagId = ""+ this.id;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.basepath = "http://192.168.0.12:8090/tag/";
    
    this.http.get(this.basepath+'/'+this.id  ,{ headers: headers })
    .map(
      res => res.json()
    )

    .subscribe(
      (result) => {

          var objTag = {"TagId":"","Code":"","Status":0};
          objTag = result;
          
          this.tagId = objTag.TagId ;
          this.code = objTag.Code;
          this.status = objTag.Status == 1 ? true : false;
         

          this.save = true;
          this.edit = false;
          loading.dismiss();
        
      }
    );

  }
  
}

editarCurso( id: string){
  

  this.tag = new Tag();
  this.tag.code = this.code ;
  this.tag.status = this.status == true ? 1 : 0;
  

  this.basepath = "http://192.168.0.12:8090/tag/update/";
  this.save = false;
  this.edit = true;

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  headers.append('Accept','application/json');
  headers.append('content-type','application/json');

  this.http.post(this.basepath+id, JSON.stringify(this.tag), { headers: headers })
    .map(
      res => res.json()
    )
    .subscribe(
      (result) => {
        this.navCtrl.push(TagPage);    
      }
    );
    // location.reload();
    this.navCtrl.push(TagPage);
}

}


export class Tag {
  tagId: string;
  code: string;
  status: number;
  
}