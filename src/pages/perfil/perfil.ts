import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, HttpModule, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private urlPerfilBase: string = "http://localhost:8090/usuario/";
  id : string ;
  public save:boolean;
  public edit:boolean;
  perfil : Perfil;
  username : string;
  fullusername : string;
  myBirthday : string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {

    this.id = navParams.get('id');
    this.carrega();
    this.save = false;
    this.edit = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  carrega() {

    

    if(!(this.id == "" || this.id == undefined)){

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
  
      loading.present();

      this.perfil = new Perfil();
      this.perfil.nome = this.username;
      this.perfil.nomeCompleto = this.fullusername;
      this.perfil.dataNascimento = this.myBirthday;

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      
      this.http.get(this.urlPerfilBase+'/GetPerfil/'+this.id  ,{ headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {

            var objPerfil = {"nome":"","nomeCompleto":"","dataNascimento":""};
            objPerfil = result;
            
            this.username = objPerfil.nome;
            this.fullusername = objPerfil.nomeCompleto;
            this.myBirthday = objPerfil.dataNascimento;
            this.save = true;
            this.edit = false;

            loading.dismiss();
          
        }
      );

    }
    
  }

 

}


export class Perfil {
  nome: string;
  nomeCompleto : string;
  dataNascimento: string;
  userId : number ;

}