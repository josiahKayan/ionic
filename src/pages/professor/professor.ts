import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { CadastrarProfessorPage } from '../cadastrar-professor/cadastrar-professor';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-professor',
  templateUrl: 'professor.html',
})
export class ProfessorPage {

  public professores: Array<any>;
  private url: string = "http://192.168.0.12:8090/professor/professores";  
  delete = "/delete";
  alertC: AlertController;
  
  
  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {
    this.delete = 'http://192.168.0.12:8090/professor/';
    this.Content();
    this.alertC = alertCtrl;

  }

  Content(): void {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    try {
      this.http.get(this.url).map(res => res.json()).subscribe(res => {
        this.professores = res;
        // alert(JSON.stringify(this.professores));
        loading.dismiss();
      });
    }
    catch (err) {
      alert(err);
    }

  }

  novo():void{
    this.navCtrl.push(CadastrarProfessorPage);
  }

  detalhar( id: string){
    this.navCtrl.push(CadastrarProfessorPage,{'id': id});
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
            
           
            (this.professores).splice(i,1);
            alert('The course was removed');
            loading.dismiss();

          }
        }
      );
      // this.viewCtrl.dismiss();
      this.Content();
  
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






