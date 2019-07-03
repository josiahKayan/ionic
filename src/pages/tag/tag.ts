import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { CadastrarTagPage } from '../cadastrar-tag/cadastrar-tag';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

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
  private url: string = "http://192.168.0.12:8090/tag/tags";  
  delete = "/delete";
  alertC: AlertController;


  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {
    this.delete = 'http://192.168.0.12:8090/tag/';
    this.alertC = alertCtrl;

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

  ngOnInit(){
    this.Content();
  }

  ionViewDidLeave(){
    this.Content();
  }

  novo():void{
    this.navCtrl.push(CadastrarTagPage);
  }

  detalhar( id: string){
    this.navCtrl.push(CadastrarTagPage,{'id': id});
  } 

  excluir( tag: Tag, id : string){

    if(tag.Status == true ){
      alert('Impossível excluir, pois a TAG está referenciado a um aluno');
    }
    else{

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE,PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    loading.present();

    this.http.get(this.delete+'delete/'+id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result.indexOf('OK')){
            loading.dismiss();
            let index = this.tags.indexOf(tag);
          
            this.Content();

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

  showConfirm() {
    const confirm = this.alertC.create({
      title: 'Sair',
      message: 'Você deseja realmente SAIR?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Agree clicked');
  
            // this.app.getRootNav().setRoot( LoginPage );
            // let rootNav = getRootNav(this.navCtrl);
            // rootNav.setRoot(LoginPage);
            //this.menu.close();
            
            this.navCtrl.setRoot(LoginPage  , { login: false} );

          }
        }
      ]
    });
    confirm.present();
  }

  
}



export class Tag {
  tagId: string;
  code: string;
  Status: boolean;
  
}