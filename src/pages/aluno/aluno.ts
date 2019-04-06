import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import { CadastrarAlunoPage } from '../cadastrar-aluno/cadastrar-aluno';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-aluno',
  templateUrl: 'aluno.html',
})
export class AlunoPage {
  
  public alunos: Array<any>;
  private url: string = "http://192.168.0.12:8090/aluno/alunos";  
  delete = "/delete";
  alertC: AlertController;
  searchTerm: string;

  
  constructor( public viewCtrl: ViewController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController,alertCtrl: AlertController) {
    this.delete = 'http://192.168.0.12:8090/aluno/';
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
        this.alunos = res;
        // alert(JSON.stringify(this.alunos));
        loading.dismiss();
        
      });
    }
    catch (err) {
      alert(err);
    }

  }

  ContentAlunos() {

    try {
       this.http.get(this.url).map(res => res.json()).subscribe(res => {
         return res;
        // alert(JSON.stringify(this.alunos));
      });
    }
    catch (err) {
      alert(err);
      return null;
    }

  }

  // getItems(searchTerm) {
  //   return this.alunos.filter(item => {
  //     return item.NomeCompleto.indexOf(searchTerm) > -1;
  //   });
  // }

  // getItems(ev) {
  //   // Reset items back to all of the items
  //   // this.initializeItems();

  //   // set val to the value of the ev target
  //   var val = ev.target.value;

  //   // if the value is an empty string don't filter the items


  //   if (val && val.trim() != '') {

  //     this.alunos = this.alunos.filter((item) => {
        
  //       return (item.NomeCompleto.indexOf(val.toLowerCase()) > -1);
  //     })
  //   }

    

  // }



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




