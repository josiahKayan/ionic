import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, HttpModule,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { HomeProfessorPage } from '../home-professor/home-professor';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username : string ;
  public password : string ;
  public basepath = "/usuario";
  public showNavbar : boolean ;
  public tabs : TabsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {

    this.basepath = "http://localhost:8090/usuario/login";

    this.showNavbar = navParams.get('login');

    if(  this.showNavbar == false ){
      this.showNavbar = false;
    }
    else{
      this.showNavbar = false;
    }
;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }

  
  }

  public login(){

    let usuario = new Usuario();

    usuario.email = this.username;
    usuario.senha = this.password;
    
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    this.http.post(this.basepath, JSON.stringify(usuario), { headers: headers })
      .map(
        res => res.json()
      )
      .subscribe(
        (result) => {
          if(result!=null || result != undefined ){
            alert('Logou');

            //Admin
            if(result.Perfil == 2){
              this.navCtrl.push(TabsPage);
            }
            //Professor
            else if(result.Perfil == 1){
              this.navCtrl.push(HomeProfessorPage, { id : result.UsuarioId});
            }
            //Aluno
            else if(result.Perfil == 0){
              this.navCtrl.push(TabsPage);
            }
          }
          else{
            alert(JSON.stringify(result));
          }
        }
      );
      // location.reload();
      // this.navCtrl.push(ProfessorPage);
    }


  }




export class Usuario{
  usuarioId: string;
  email: string;
  senha: string;
  perfil: number;
}
